export const fetchCountries = async () => {
    return await fetch('https://corona.lmao.ninja/v2/countries?yesterday&sort')
            .then(response => {
                return response.json()
            })
            .catch(error => console(error));
}