const fs = require("fs");
const inquirer = require("inquirer");
const util = require("util");
const axios = require("axios");

const writeFileAsync = util.promisify(fs.writeFile);

getData();

async function getData(data) {

    let questions = [{
        type: "input",
        name: "username",
        message: "What is your name?"
    },
    {
        type: "input",
        name: "title",
        message: "What is your repo's title?"
    },
    {
        type: "input",
        name: "description",
        message: "What is your repo's description?"
    },
    {
        type: "input",
        name: "tableOfContents",
        message: "What is your table of contents?"
    },
    {
        type: "input",
        name: "installation",
        message: "How do you install?"
    },
    {
        type: "input",
        name: "usage",
        message: "How do you use it?"
    },
    {
        type: "input",
        name: "license",
        message: "What is your license?"
    },
    {
        type: "input",
        name: "contributing",
        message: "Who contributed?"
    },
    {
        type: "input",
        name: "tests",
        message: "Tell me about your process for testing."
    },
    {
        type: "input",
        name: "question",
        message: "Do you have any questions?"
    }
]
    
    try {
        const {username, title, description, tableOfContents, installation, usage, license, contributing, tests, question}  = await inquirer.prompt(questions);

        let {data} = await axios.get(`https://api.github.com/users/${username}`)

        await writeFileAsync("readme1.md",  `
        # **GitHub Username:** ${username}
        # **Email:** ${data.email}
        # **Bio Image:** ${data.avatar_url}
        # Repo Title: ${title}
        # Repo Description: ${description}
        # Table of Contents: ${tableOfContents}
        # Installation: ${installation}
        # Usage: ${usage}
        # License: ${license}
        # Contributing: ${contributing}
        # Tests: ${tests}
        # Questions: ${question}
        `)

    } catch (err) {
        console.log(err);
    }
}
