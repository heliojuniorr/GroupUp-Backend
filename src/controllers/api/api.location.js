const axios = require('axios')

async function getCities(state){
    try {
        let response = (await axios.get(`https://servicodados.ibge.gov.br/api/v1/localidades/estados/${state}/municipios`)).data
        let cities = []
    
        if(response){
            response.forEach(element => {
                cities.push(element.nome)
            })

            return cities
        }     
    } catch (error) {
        console.log(error)
    }
}

// async function testApi(state){
//     console.log(await getCities(state))
// }

// testApi('MA')