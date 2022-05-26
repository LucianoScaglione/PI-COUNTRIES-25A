const { Router } = require('express');
const router = Router();
const { Country, TouristActivity } = require('../db')
const axios = require('axios')
const { Op } = require('sequelize')


const getFromDb = async () => { // consulta si las tablas de la base de datos tienen algo
  let saved = await Country.findAll({
    include: TouristActivity
  });
  return saved;
}


router.get('/countries', async (req, res, next) => {
  try {
    const foundDate = await getFromDb()
    if (!foundDate.length) {
      const loadingCountries = await axios.get('https://restcountries.com/v3/all')
      const countriesDATA = loadingCountries.data.map((c) => {
        return {
          id: c.cca3,
          name: c.name.common,
          flags: c.flags[0],
          continent: c.region,
          capital: c.capital ? c.capital[0] : "Not found",
          subregion: c.subregion ? c.subregion : "Not found",
          area: Math.round(c.area),
          population: c.population,
        }
      })
      let savedInformation = await Country.bulkCreate(countriesDATA) // Cuando necesite insertar varias filas en la tabla de su base de datos SQL, puede usar el método Sequelize bulkCreate(). El método bulkCreate() le permite insertar múltiples registros en la tabla de su base de datos con una sola llamada de función.
      res.status(200).send(savedInformation);
    } else {
      const { name } = req.query
      if (name) {
        const search = await Country.findAll({
          where: {
            name: {
              [Op.iLike]: `%${name}%`    // que contenga lo que le llegue por parametro.. caso insensitive
            }
          }
        })
        search.length ? res.status(200).send(search) : res.status(404).send("No se encontró el país buscado")
      } else {
        res.status(200).send(foundDate)
      }
    }
  } catch (error) {
    console.log(error)
  }
})


router.get('/countries/:idPais', async (req, res) => {
  try {
    const { idPais } = req.params
    if (idPais) {
      let found = await Country.findOne({
        where: {
          id: idPais.toUpperCase()
        },
        include: TouristActivity
      })
      if (found) {
        res.status(200).send(found)
      } else {
        res.status(400).json("ID no encontrado")
      }
    }
  } catch (e) {
    console.log(e) //res.status(404).send({ error: e.message })
  }
})


router.post('/activity', async (req, res) => {
  try {
    const { nombre, dificultad, duracion, temporada, idPais } = req.body
    if (nombre || dificultad || duracion || temporada) {
      let createActivity = await TouristActivity.create({
        nombre,
        dificultad,
        duracion,
        temporada
      })
      let idCountries = idPais.forEach(e => {
        createActivity.addCountries(e)  // metodo add que se usa para la tabla que queramos, por ejemplo la tabla Countries de la db 
      });
      res.status(201).send(createActivity)
    }
  } catch (e) {
    console.log(e)
  }
})

module.exports = router;
