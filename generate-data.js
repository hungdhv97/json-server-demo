const faker = require('faker');
const fs = require('fs')

faker.locale = 'vi';

const randomCategoryList = (n) => {
    if (n <= 0) return [];

    const categoryList = [];
    Array.from(new Array(n)).forEach(() => {
        const category = {
            id: faker.datatype.uuid(),
            name: faker.commerce.department(),
            createdAt: Date.now(),
            updatedAt: Date.now()
        };

        categoryList.push(category);
    });

    return categoryList;
}

const randomProductList = (categoryList, numberOfProduct) => {
    if (numberOfProduct <= 0) return [];

    const productList = [];

    for (const category of categoryList) {
        Array.from(new Array(numberOfProduct)).forEach(() => {
            product = {
                categoryId: category.id,
                id: faker.datatype.uuid(),
                name: faker.commerce.productName(),
                color: faker.commerce.color(),
                price: faker.commerce.price(),
                description: faker.commerce.productDescription(),
                createdAt: Date.now(),
                updatedAt: Date.now(),
                thumbnailUrl: faker.image.imageUrl(400, 400)
            }

            productList.push(product);
        })
    }

    return productList;
}


(() => {
    const categoryList = randomCategoryList(4);
    const productList = randomProductList(categoryList, 5);

    const db = {
        categories: categoryList,
        products: productList,
        profile: {
            "name": "hung"
        },
        foods: [
            {
                "id": "1b6193bf-af64-49c6-abbf-f288fb891137",
                "name": "Thái Doãn Hùng",
                "food": "Mì tôm ngan"
            },
            {
                "id": "1524f779-52ce-4785-bb65-e4e4b3de5d5a",
                "name": "Nguyễn Đình Chung",
                "food": "Miến ngan"
            },
            {
                "id": "db46688d-c961-45b3-b5d8-5a8cbb667c38",
                "name": "Nguyễn Phương Ngọc",
                "food": "Bánh mì"
            }
        ]
    }

    fs.writeFile("db.json", JSON.stringify(db), () => {
        console.log("Generate Successfully");
    })
})();