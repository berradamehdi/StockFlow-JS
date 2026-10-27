let values = {
    title : "",
    price : 0,
    taxes : 0,
    ads   : 0,
    discount : 0,
    total : 0,
    count : 0,
    category : "",
}

let data = []
const getData = () => {
    const getProducts = localStorage.getItem("products")
    data = getProducts ? JSON.parse(getProducts) : []
    console.log("yes")
}

getData()
let id = data.length > 0 ? data[data.length - 1].id : 0

const title = document.querySelector(".input-title")
const price = document.querySelector(".input-price")
const taxes = document.querySelector(".input-taxes")
const ads = document.querySelector(".input-ads")
const discount = document.querySelector(".input-discount")
const total = document.querySelector(".input-total")
const count = document.querySelector(".input-count")
const category = document.querySelector(".input-category")
const search = document.querySelector(".input-search")
const table_data = document.querySelector(".table-data")
const message = document.querySelector(".message-box")
const searchValue = document.querySelector(".search-value")

const setTitle = () => {
    if(title.value.length < 15) {
        values.title = title.value
    }
}

const setPrice = () => {
    const checkType = Number.parseFloat(price.value) 
    if(checkType){
        if(checkType > 0) {
            values.price = checkType
            getTotal()
        }
        else {
            price.value = ""
        }
    }
    else {
        price.value = ""
    }
}

const setTaxes = () => {
    const checkType = Number.parseFloat(taxes.value) 
    if(checkType){
        if(checkType > 0) {
            values.taxes = checkType
            getTotal()
        }
        else {
            taxes.value = ""
        }
    }
    else {
        taxes.value = ""
    }
}

const setAds = () => {
    const checkType = Number.parseFloat(ads.value) 
    if(checkType){
        if(checkType > 0) {
            values.ads = checkType
            getTotal()
        }
        else {
            ads.value = ""
        }
    }
    else {
        ads.value = ""
    }
}

const setDiscount = () => {
    const checkType = Number.parseFloat(discount.value) 
    if(checkType){
        if(checkType > 0) {
            values.discount = checkType
            getTotal()
        }
        else {
            discount.value = ""
        }
    }
    else {
        discount.value = ""
    }
}

const getTotal = () => {
    values.total = ( values.price + values.taxes + values.ads  ) - values.discount
    total.value = values.total
}

const setCount = () => {
    const checkType = Number.parseInt(count.value) 
    if(checkType){
        if(checkType > 0) {
            values.count = checkType
        }
        else {
            count.value = ""
        }
    }
    else {
        count.value = ""
    }
}

const setCategory = () => {
    values.category = category.value.toLowerCase()
} 

const validateProduct = () => {
    // Validation Title
    if( values.title.length === 0 ) {
        messageBox("This field Title is required",false)
        return 0
    }
    if( typeof values.title != "string" ) {
        messageBox("This field Title is required",false)
        return 0
    }
    if( values.title.length < 3 ) {
        messageBox("Minimum length is 3 characters",false)
        return 0
    }
    if( data.includes(values.title) ) {
        messageBox("This field Title is required",false)
        return 0
    }

    // Validation Price, Taxes, Ads, Discount
    if( typeof values.price != "number" || typeof values.taxes != "number" || typeof values.ads != "number" || typeof values.discount != "number") {
        console.log(typeof values.price)
        messageBox("Value must be a numeric format",false)
        return 0
    }
    if( values.discount > values.price ) {
        messageBox("Discount cannot exceed the price",false)
        return 0
    }

    // Validation Count
    if (typeof values.count != "number" ) {
        messageBox("Value must be a numeric format",false)
        return 0
    }

    // Validation Category
    if (values.category.length === 0) {
        messageBox("This field Category is required",false)
        return 0
    }

    return true
}

const addProduct = () => {
    if (!validateProduct()) {
        console.log("yes")
        return 0
    }
    id++
    data.push({
        id : id,
        title : values.title.toLowerCase(),
        price : values.price,
        taxes : values.taxes,
        ads   : values.ads,
        discount : values.discount,
        total : values.total,
        count : values.count,
        category : values.category.toLowerCase(),
    })

    title.value = ""
    price.value = ""
    taxes.value = ""
    ads.value = ""
    discount.value = ""
    total.value = ""
    count.value = ""
    category.value = ""

    values = {
        title : "",
        price : 0,
        taxes : 0,
        ads   : 0,
        discount : 0,
        total : 0,
        count : 0,
        category : "",
    }

    localStorage.setItem("products",JSON.stringify(data))
    viewProduct()
    messageBox("Item added successfully ",true)
}

const viewProduct = () => {
    table_data.innerHTML = 
    `
        <div class="child-one"> id </div>
        <div class="child-one"> title </div>
        <div class="child-one"> price </div>
        <div class="child-one"> taxes </div>
        <div class="child-one"> ads </div>
        <div class="child-one"> count </div>
        <div class="child-one"> discount </div>
        <div class="child-one"> total </div>
        <div class="child-one"> category </div>
        <div class="child-one"> operation </div>
    `
    data.map(product => {
        table_data.innerHTML += ` <div class="child"> ${product.id} </div> `
        table_data.innerHTML += ` <div class="child"> ${product.title} </div> `
        table_data.innerHTML += ` <div class="child"> ${product.price} </div> `
        table_data.innerHTML += ` <div class="child"> ${product.taxes} </div> `
        table_data.innerHTML += ` <div class="child"> ${product.ads} </div> `
        table_data.innerHTML += ` <div class="child"> ${product.count} </div> `
        table_data.innerHTML += ` <div class="child"> ${product.discount} </div> `
        table_data.innerHTML += ` <div class="child"> ${product.total} </div> `
        table_data.innerHTML += ` <div class="child"> ${product.category} </div> `
        table_data.innerHTML += 
        ` 
        <div class="child child-box">
            <button class="btn" onclick="edit('${product.id}')"> update </button>
            <button class="btn" onclick="drop('${product.id}')"> delete </button>
        </div> 
        `
    })

    getData()
}

viewProduct()

const drop = (id) => {
    data = data.filter(product => product.id != id)
    localStorage.clear()
    localStorage.setItem('products',JSON.stringify(data))
    viewProduct()
    messageBox("Item deleted successfully",true)
}

const dropAll = () => {
    if(data.length > 0) {
        data = []
        localStorage.clear()
        viewProduct()
        messageBox("All products deleted successfully",true)
    }
    else {
        messageBox("No products available to delete",false)
    }
}

const edit = (id) => {
    data.map(product => {
        if(product.id == id) {
            product.title = values.title ? values.title.toLowerCase() : product.title
            product.price = values.price ? values.price : product.price
            product.taxes = values.taxes ? values.taxes : product.taxes
            product.ads   = values.ads   ? values.ads   : product.ads  
            product.discount = values.discount ? values.discount : product.discount
            product.count = values.count ? values.count : product.count
            product.category = values.category ? values.category.toLowerCase() : product.category
        }
    })
    localStorage.clear()
    localStorage.setItem('products',JSON.stringify(data))
    viewProduct()
    messageBox("Product updated successfully",true)
}

const messageBox = (mes,statu) => {
    message.style.display = "flex"
    if(statu) {
        message.classList.add("success")
        message.innerHTML = `<span class="message"> ${mes} <i class="fa-solid fa-circle-check"></i> </span>`
        setTimeout(() => {
            message.style.display = "none"
            message.classList.remove("success")
            message.innerHTML = ""
        }, 3000);
    }
    else {
        message.classList.add("faild")
        message.innerHTML = `<span class="message"> ${mes} <i class="fa-solid fa-circle-xmark"></i> </span>`
        setTimeout(() => {
            message.style.display = "none"
            message.classList.remove("faild")
            message.innerHTML = ""
        }, 3000);
    }
}

const byCategory = () => {
    if(searchValue.value) {
        let categoriesSearch = data.filter(product => product.category.includes(searchValue.value.toLowerCase()))
        if(categoriesSearch.length > 0) {
            data = categoriesSearch
            viewProduct()
            messageBox("Products by category",true)
            return 0
        }
        messageBox("No category provided to display",false)
        return 0
    }
    messageBox("Search query cannot be empty",false)
}

const byTitle = () => {
    if(searchValue.value) {
        let titleSearch = data.filter(product => product.title.includes(searchValue.value.toLowerCase()))
        if(titleSearch.length > 0) {
            data = titleSearch
            viewProduct()
            messageBox("Products by title",true)
            return 0
        }
        messageBox("No title provided to display",false)
        return 0
    }
    messageBox("Search query cannot be empty",false)
}