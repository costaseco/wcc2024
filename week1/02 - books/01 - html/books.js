function createStars(rating, number) {
    console.log(rating)
    const div = document.createElement("DIV")
    for (let i = 0; i < 5; i++) {
        const star = document.createElement("SPAN")
        star.innerText = "★"
        star.classList.add("star")
        if (i + 1 <= rating)
            star.classList.add("yellowstar")
        div.append(star)
    }
    const numberSpan = document.createElement("SPAN")
    numberSpan.innerText = `(${number})`
    div.append(numberSpan)
    return div
}

function createBookBox(book) {
    const li = document.createElement("LI")
    const bookbox = document.createElement("DIV")
    bookbox.classList.add("bookbox")

    const img = document.createElement("IMG")
    img.setAttribute("src", book.image)
    bookbox.append(img)

    const div = document.createElement("DIV")
    const title = document.createElement("H2")
    title.innerText = book.title
    div.append(title)

    const authors = document.createElement("H3")
    authors.innerText = book.authors.join(", ")
    div.append(authors)

    bookbox.append(div)

    bookbox.append(createStars(book.rating, book.numberrating))

    li.append(bookbox)
    return li
}

function fillBooks(books) {
    const lista = document.getElementById("listofbooks")
    for (const idx in books) {
        const li = createBookBox(books[idx])
        lista.append(li)
    }
}

async function loadBooks() {
    return fetch("./books.json").then(data => data.json())
}

function loadAndFillBooks() {
    loadBooks().then(books => { fillBooks(books) })
}

function installEventHandlers() {

}

window.onload = () => {
    loadAndFillBooks()

    installEventHandlers()
}

