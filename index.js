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
    }]
    
    try {
        const {username, title, description, tableOfContents, installation}  = await inquirer.prompt(questions);

        let {data} = await axios.get(`https://api.github.com/users/${username}`)
        
        await writeFileAsync("readme1.md",  `
        ## GitHub Username: ${username}
        ## Email: ${data.email}
        ## Bio Image: ${data.avatar_url}
        ## Repo Title: ${title}
        ## Repo Description: ${description}
        ## Table of Contents: ${tableOfContents}
        ## Installation: ${installation}
        `)

    } catch (err) {
        console.log(err);
    }
}
