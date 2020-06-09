const EntitySchema = require("typeorm").EntitySchema; // import {EntitySchema} from "typeorm";
const Estudiantes = require("./students").Estudiantes; // import {Post} from "../model/Post";

module.exports = new EntitySchema({
    name: "Estudiantes",
    target: Estudiantes,
    columns: {
        id: {
            primary: true,
            type: "int",
            generated: true
        },
        nombre: {
            type: "text"
        },
        apellido: {
            type: "text"
        },
        grado: {
            type: "text"
        }
    }
});