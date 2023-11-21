import { Image } from "@/entities/image";

const images = [
    {
        id: "QGyYUvh2mXw6PvC6",
        name: "nick-1",
        imgSrc: "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e4/Nick_Vujicic_speaking_in_a_church_in_Ehringshausen%2C_Germany_-_20110401-02.jpg/800px-Nick_Vujicic_speaking_in_a_church_in_Ehringshausen%2C_Germany_-_20110401-02.jpg",
        createdDate: "Nov 16, 2023, 8:03:08 PM",
        type: "JPEG",
        size: "225x322",
        concept: "nick-vujicic",
    },
    {
        id: "L7JHww5PN3VFwx7k",
        name: "nick-2",
        imgSrc: "https://upload.wikimedia.org/wikipedia/commons/thumb/e/ec/Nick_Vujicic_%2851770686466%29_%28cropped%29.jpg/440px-Nick_Vujicic_%2851770686466%29_%28cropped%29.jpg",
        createdDate: "Nov 16, 2023, 8:02:27 PM",
        type: "JPEG",
        size: "1966x2624",
        concept: "nick-vujicic",
    },
    {
        id: "fsqdvxjyQ3rrBB0a",
        name: "nick-3",
        imgSrc: "https://encrypted-tbn1.gstatic.com/images?q=tbn:ANd9GcREFBU-vtx_0LtHksN9QNQ-jS5RQSYvHt2ROfbUCUShI0UteFF0",
        createdDate: "Nov 16, 2023, 8:02:34 PM",
        type: "JPEG",
        size: "632x390",
        concept: "nick-vujicic",
    },
    {
        id: "u4lcqGKdQhGp6Wvw",
        name: "nick-4",
        imgSrc: "https://encrypted-tbn2.gstatic.com/images?q=tbn:ANd9GcRWHAw3Yqz__X936Uej5gLXPPmL6-rkoquyzmyFUVXRTfgj-6dR",
        createdDate: "Nov 16, 2023, 8:02:42 PM",
        type: "JPEG",
        size: "1360x907",
        concept: "nick-vujicic",
    },
    {
        id: "DeEat4z1m8hNRHfX",
        name: "nick-5",
        imgSrc: "https://encrypted-tbn3.gstatic.com/images?q=tbn:ANd9GcSKd-jJOPDBXmJwtWrn3z46qCGOxEZp5jxxBW1hOQr60P5X3sGv",
        createdDate: "Nov 16, 2023, 8:02:54 PM",
        type: "JPEG",
        size: "1365x2048",
        concept: "nick-vujicic",
    },
    {
        id: "CEOmqk5W9goK11H2",
        name: "nick-6",
        imgSrc: "https://encrypted-tbn1.gstatic.com/images?q=tbn:ANd9GcQLgkYaSO1WBamHRmaISI9fkazX0nq-rJdFkVXVaHOh1BFEXlA6",
        createdDate: "Nov 16, 2023, 8:03:08 PM",
        type: "JPEG",
        size: "350x526",
        concept: "Unlabeled",
    },
    {
        id: "GA2rCqOUpGMv8zpg",
        name: "nick-7",
        imgSrc: "https://encrypted-tbn3.gstatic.com/images?q=tbn:ANd9GcSUjtC43LqRrp5F4ubtjpRDdU3s1p5NicbN74ehyBjJ-HALFZYw",
        createdDate: "Nov 16, 2023, 8:03:08 PM",
        type: "JPEG",
        size: "650x410",
        concept: "Unlabeled",
    },
    {
        id: "jrlSXdY4Z8eltYxJ",
        name: "nick-8",
        imgSrc: "https://encrypted-tbn1.gstatic.com/images?q=tbn:ANd9GcSRvjlV-JRK5gVmUhsUU2H6p1D-RWkrq6suDG9WtcZcRQGvh4JZ",
        createdDate: "Nov 16, 2023, 8:03:08 PM",
        type: "JPEG",
        size: "183x275",
        concept: "Unlabeled",
    },
    {
        id: "xCPpQusV9NLv6UUb",
        name: "nick-9",
        imgSrc: "https://encrypted-tbn2.gstatic.com/images?q=tbn:ANd9GcQllv7LCZPA9Ki-L6itztqswYbeVf7KfUBhzAm7du8jTSaFADF3",
        createdDate: "Nov 16, 2023, 8:03:08 PM",
        type: "JPEG",
        size: "840x538",
        concept: "Unlabeled",
    },
    {
        id: "xTlfHbi9xju4tdNm",
        name: "nick-10",
        imgSrc: "https://encrypted-tbn1.gstatic.com/images?q=tbn:ANd9GcRrlXvXxVJO9DOFg12zC1LyLxlBbd8ZetsNrAzF41oXa9jbiClN",
        createdDate: "Nov 16, 2023, 8:03:08 PM",
        type: "JPEG",
        size: "686x386",
        concept: "Unlabeled",
    },
]

export const fetchImages = async (query = ""): Promise<Image[]> => {
    await new Promise((resolve) => setTimeout(resolve, 1000));

    const filteredImages = images.filter((image) =>
        image.concept.toLowerCase().includes(query.toLowerCase())
    );

    // Uncomment the line below to trigger an error
    // throw new Error();

    return [...filteredImages];
};