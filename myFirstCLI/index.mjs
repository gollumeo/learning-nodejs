#!/usr/bin/env node
import ora from 'ora';
import countryList from 'country-list';
import axios from 'axios';

const year = process.argv[3] || new Date().getFullYear();
const country = process.argv[2];
const countryCode = countryList.getCode(country);
const url = `https://date.nager.at/api/v2/publicholidays/${year}/${countryCode}`

const spinner = ora('Loading request')
let holidays;

async function holidates() {
    spinner.start()
    let response = await axios.get(url);
    spinner.stop();
    holidays = response.data;
    console.log(`Holidays in ${country} for year ${year}:`)
    holidays.forEach((holiday) => {
        console.log(`- ${holiday.date}: ${holiday.name}`);
    });
}

holidates(country, year);
