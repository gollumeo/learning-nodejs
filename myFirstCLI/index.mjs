#!/usr/bin/env node
import ora from 'ora';
import countryList from 'country-list';
import axios from 'axios';

const year = process.argv[3] || new Date().getFullYear();
const country = process.argv[2];
const countryCode = countryList.getCode(country);
const url = `https://date.nager.at/api/v2/publicholidays/${year}/${countryCode}`

const spinner = ora('Loading request')
spinner.start()
let holidays;
axios
    .get(url)
    .then((response) => {
        holidays = response.data;
        spinner.stop()
        console.log(`Holidays in ${country} for year ${year}:`)
        holidays.forEach((holiday) => {
            console.log(`- ${holiday.date}: ${holiday.name}`);
        });
    })

    .catch((error) => {
        console.log(error);
    })
