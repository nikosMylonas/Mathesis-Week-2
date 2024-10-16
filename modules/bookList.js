import fs from 'fs/promises';

const fileName = './data/myBooks.json';
// const fileName = '../../../data/myBooks.json'; // Run from contents/2_1/2_1_2/app.js



class BookList {
    myBooks = { books: [] };

    async loadBooks() {
        try {
            const data = await fs.readFile(fileName, 'utf-8');
            this.myBooks = JSON.parse(data);
        } catch (err) {
            throw err;
        }
    }

    async addBookToList(newBook) {
        await this.loadBooks();
        if (!this.isBookInList(newBook)) {
            // this.myBooks.books.push(newBook);
            this.myBooks.books = [...this.myBooks.books, newBook];
            try {
                await fs.writeFile(fileName, JSON.stringify(this.myBooks), { flag: 'w+' });
            } catch (err) {
                throw err;
            }
        }
    }

    isBookInList(book) {
        let bookFound = this.myBooks.books.find((item) => (
            item.author === book.author &&
            item.title === book.title));
        return bookFound;
    }
}

export { BookList };
