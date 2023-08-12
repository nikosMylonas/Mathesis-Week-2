import express from 'express';
import { BookList } from './bookList.mjs';
import { body, validationResult } from 'express-validator';

const router = express.Router();

const bookList = new BookList();

router.use(express.urlencoded({ extended: false }));

router.get('/books', async (req, res) => {
    await bookList.loadBooks();
    res.render('booklist', { books: bookList.myBooks.books });
});

router.get('/addbookform', (req, res) => {
    res.render('bookform');
});

router.post('/doaddbook',
    body('title')
        .notEmpty()
        .withMessage('Το πεδίο είναι υποχρεωτικό')
        .isLength({ min: 3 })
        .withMessage('Απαιτούνται τουλάχιστον 3 χαρακτήρες')
        .isAlpha('el-GR', { ignore: '\s.,\'1234567890' })
        .withMessage('Επιτρέπονται μόνο ελληνικοί χαρακτήρες'),
    body('author')
        .notEmpty()
        .withMessage('Το πεδίο είναι υποχρεωτικό')
        .isLength({ min: 3 })
        .withMessage('Απαιτούνται τουλάχιστον 3 χαρακτήρες')
        .isAlpha('el-GR', { ignore: '/s.,\'' })
        .withMessage('Επιτρέπονται μόνο ελληνικοί χαρακτήρες'),
    body('editor')
        .notEmpty()
        .withMessage('Το πεδίο είναι υποχρεωτικό')
        .isLength({ min: 2 })
        .withMessage('Απαιτούνται τουλάχιστον 3 χαρακτήρες')
        .isAlpha('el-GR', { ignore: '\s1234567890' }),
    body('year')
        .notEmpty()
        .withMessage('Το πεδίο είναι υποχρεωτικό')
        .isInt()
        .withMessage('Εισάγετε το Ετος σε μορφή YYYY (Από 1990 και μετά)')
        .isLength({ min: 4, max: 4 })
        .withMessage('Εισάγετε το Ετος σε μορφή YYYY (Από 1990 και μετά)')
        .custom(value => {
            if (value < 1990 || value > new Date().getFullYear()) {
                throw new Error('Μη αποδεκτό έτος')
            } else {
                return true;
            }
        }),
    async (req, res) => {
        const errors = validationResult(req);
        if (errors.isEmpty()) {
            const newBook = {
                "author": req.body.author,
                "title": req.body.title,
                "editor": req.body.editor,
                "year": req.body.year
            }
            await bookList.addBookToList(newBook);
            res.redirect('/books');

        } else {
            res.render('bookform', {
                message: errors.mapped(),
                author: req.body.author,
                title: req.body.title,
                editor: req.body.editor,
                year: req.body.year
            });
        }
    });

router.use((req, res) => {
    res.redirect('/books');
});


export { router };

