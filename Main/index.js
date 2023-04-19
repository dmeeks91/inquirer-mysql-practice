const inquirer = rquire("inquirer");
const { viewAllMovies } = require("./db");
const db = require("./db");
require("console.table");

async function userActionPrompt(){
    const response = await inquirer.prompt([
        {
            type: "list",
            name: "choice",
            message: "What would you like to do?",
            choices: [
                {
                    name: "View All Movies",
                    value: "viewAllMovies"
                },
                {
                    name: "View All Movie Reviews",
                    value: "viewAllReviews"
                },
                {
                    name: "Add Movie",
                    value: "addMovie"
                },
                {
                    name: "Remove Movie",
                    value: "removeMovie"
                },
                {
                    name: "Update Movie Review",
                    value: "updateMovie"
                },
                {
                    name: "Quit",
                    value: "QUIT"
                }
            ]
        }
    ]);

    switch(response.choice){
        case "viewAllMovies":
            await viewAllMovies();
    }
}

async function viewAllMovies(){
    const [rows] = await db.viewAllMovies();

    console.table(rows);
}

userActionPrompt();