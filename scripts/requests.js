const fetchPuzzle = (difficulty) => {
    const API_URL = `http://puzzle.mead.io/puzzle?wordCount=${difficulty}`
    return fetch(API_URL).then((response) => {
        if(response.status === 200){
            return response.json()
        }else{
            throw new Error('Unable to fetch puzzle!')
        }
    }).then((data) => data.puzzle)
}

const fetchLocation = () => {
    const API_KEY = '2d15dced72ad47'
    const API_URL = `http://ipinfo.io/json?token=${API_KEY}`
    return fetch(API_URL).then((response) => {
        if(response.status === 200){
            return response.json()
        }else{
            throw new Error('Unable to fetch location!')
        }
    }).then(({city, region, country}) => ({
        city,
        region,
        country
    }))
}

const fetchCountry = (country) => {
    const API_URL = 'https://restcountries.eu/rest/v2/all'

    return fetch(API_URL).then((response) => {
        if(response.status === 200){
            return response.json()
        }else{
            throw new Error('Unable to fetch countries data!')
        }
    }).then((countries) => {
        const c = findCountry(country, countries)
        if(!c){
            throw new Error('Unable to find country!')
        }else{    
            return {
                name: c.name,
                flag: c.flag
            }
        }
    })
}

const findCountry = (countryCode, countries) => countries.find((country) => country.alpha2Code === countryCode)


const getLocationData = async () => {
    const location = await fetchLocation()
    const country = await fetchCountry(location.country)

    return {
        city: location.city,
        region: location.region,
        country: country.name,
        flag: country.flag
    }
}
