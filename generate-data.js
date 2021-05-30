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
        }
    }

    fs.writeFile("db.json", JSON.stringify(db), () => {
        console.log("Generate Successfully");
    })
})();