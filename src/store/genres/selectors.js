export const genres =[
    {
        "key": 28,
        "text": "Akció",
        "value": "Akció"
    },
    {
        "key": 12,
        "text": "Kaland",
        "value": "Kaland"
    },
    {
        "key": 16,
        "text": "Animációs",
        "value": "Animációs"
    },
    {
        "key": 35,
        "text": "Vígjáték",
        "value": "Vígjáték"
    },
    {
        "key": 80,
        "text": "Bűnügyi",
        "value": "Bűnügyi"
    },
    {
        "key": 99,
        "text": "Dokumentum",
        "value": "Dokumentum"
    },
    {
        "key": 18,
        "text": "Dráma",
        "value": "Dráma"
    },
    {
        "key": 10751,
        "text": "Családi",
        "value": "Családi"
    },
    {
        "key": 14,
        "text": "Fantasy",
        "value": "Fantasy"
    },
    {
        "key": 36,
        "text": "Történelmi",
        "value": "Történelmi"
    },
    {
        "key": 27,
        "text": "Horror",
        "value": "Horror"
    },
    {
        "key": 10402,
        "text": "Zenei",
        "value": "Zenei"
    },
    {
        "key": 9648,
        "text": "Rejtély",
        "value": "Rejtély"
    },
    {
        "key": 10749,
        "text": "Romantikus",
        "value": "Romantikus"
    },
    {
        "key": 878,
        "text": "Sci-Fi",
        "value": "Sci-Fi"
    },
    {
        "key": 10770,
        "text": "TV film",
        "value": "TV film"
    },
    {
        "key": 53,
        "text": "Thriller",
        "value": "Thriller"
    },
    {
        "key": 10752,
        "text": "Háborús",
        "value": "Háborús"
    },
    {
        "key": 37,
        "text": "Western",
        "value": "Western"
    }
].sort((a, b) => sortByText(a, b))

function sortByText(a, b) {
    return (a.text).localeCompare(b.text);
}