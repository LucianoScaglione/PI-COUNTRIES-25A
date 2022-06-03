const { Router } = require('express');
const router = Router();
const { Country, TouristActivity } = require('../db')
const axios = require('axios')
const { Op } = require('sequelize')


const getFromDb = async () => { 
  let saved = await Country.findAll({
    include: TouristActivity //  esto sirve para cuando pidamos la informacion de un pais, tambien nos envíe la actividad turística que el cliente haya creado, relacionada a ese pais. Esto se hace gracias a la relacion de muchos a muchos
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
      let savedInformation = await Country.bulkCreate(countriesDATA) 
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
          id: idPais.toUpperCase() // mayuscula
        },
        include: TouristActivity // ???? gracias a esto, podemos traer la informacion de detalle del pais con sus actividades creadas.
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

router.get('/activity', async (req, res) => {
  try {
    let contedorActividades = await TouristActivity.findAll()

    if (contedorActividades.length) {
      res.status(200).send(contedorActividades)
    } else {
      res.status(404).send("No se encuentran actividades creadas")
    }
  } catch (error) {
    console.log(error)
  }
}) 


router.post('/activity', async (req, res) => {
  try {
    const { nombre, dificultad, duracion, temporada, paises } = req.body
    if (nombre || dificultad || duracion || temporada) {
      const createActivity = await TouristActivity.create({
        nombre,
        dificultad,
        duracion,
        temporada
      });
      paises.forEach(async (e) => {
        let createActivityCountry = await Country.findOne({
          where: {
            name: e // el id sea igual al id del pais que le mandamos o seleccionó el cliente.
          }
        })
        await createActivity.addCountry(createActivityCountry) // ??? 
      })
    }
    res.status(201).send("Actividad creada!")
  } catch (e) {
    console.log(e)
  }
})

module.exports = router;
