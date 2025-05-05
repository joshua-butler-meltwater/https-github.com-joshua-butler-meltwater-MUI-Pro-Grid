"use client"
import { useState } from "react"
import Box from "@mui/material/Box"
// Import both DataGrid and DataGridPro to support fallback if license is invalid
import { DataGrid } from "@mui/x-data-grid"
import { DataGridPro, GridToolbar } from "@mui/x-data-grid-pro"
// Import the license file
import "./mui-license"
import {
  Paper,
  Toolbar,
  Typography,
  TextField,
  IconButton,
  Menu,
  MenuItem,
  Checkbox,
  FormControlLabel,
  Tooltip,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Slide,
} from "@mui/material"
import { 
  Search, 
  Info as InfoOutlined, 
  FilterAlt, 
  MoreVert, 
  Edit, 
  Delete, 
  Fullscreen, 
  Close,
  Download,
} from "@mui/icons-material"

// Create a variable to determine which DataGrid component to use
// In production with a valid license, use DataGridPro
const GridComponent = DataGridPro

// Expanded data structure with 42 countries and additional columns
const rows = [
  {
    id: 1,
    continent: "Africa",
    country: "Nigeria",
    capital: "Abuja",
    population: "206 million",
    area: "923,768 km²",
    governmentType: "Federal presidential republic",
    headOfState: "President Bola Tinubu",
    headOfGovernment: "President Bola Tinubu",
    independence: "October 1, 1960",
    adminDivisions: "36 states and 1 territory",
    gdpTotal: "$448 billion",
    gdpPerCapita: "$2,085",
    currency: "Nigerian Naira",
    majorIndustries: "Oil, agriculture, telecommunications",
    majorExportsImports: "Exports: petroleum, cocoa; Imports: machinery, chemicals",
    unemploymentRate: "33.3%",
    giniCoefficient: "35.1",
    hdi: "0.539 (Low)",
    lifeExpectancy: "54.7 years",
    literacyRate: "62%",
    majorReligions: "Islam (53.5%), Christianity (45.9%)",
    majorEthnicGroups: "Hausa, Yoruba, Igbo, Fulani",
    urbanRuralRatio: "52:48",
  },
  {
    id: 2,
    continent: "Africa",
    country: "Egypt",
    capital: "Cairo",
    population: "102 million",
    area: "1,001,450 km²",
    governmentType: "Unitary semi-presidential republic",
    headOfState: "President Abdel Fattah el-Sisi",
    headOfGovernment: "Prime Minister Mostafa Madbouly",
    independence: "February 28, 1922",
    adminDivisions: "27 governorates",
    gdpTotal: "$363 billion",
    gdpPerCapita: "$3,561",
    currency: "Egyptian Pound",
    majorIndustries: "Textiles, tourism, food processing",
    majorExportsImports: "Exports: crude oil, textiles; Imports: machinery, food",
    unemploymentRate: "7.2%",
    giniCoefficient: "31.5",
    hdi: "0.707 (Medium)",
    lifeExpectancy: "71.8 years",
    literacyRate: "71.2%",
    majorReligions: "Islam (90%), Christianity (10%)",
    majorEthnicGroups: "Egyptian Arabs, Bedouins, Berbers",
    urbanRuralRatio: "43:57",
  },
  {
    id: 3,
    continent: "Africa",
    country: "South Africa",
    capital: "Pretoria",
    population: "59 million",
    area: "1,221,037 km²",
    governmentType: "Parliamentary republic",
    headOfState: "President Cyril Ramaphosa",
    headOfGovernment: "President Cyril Ramaphosa",
    independence: "May 31, 1961",
    adminDivisions: "9 provinces",
    gdpTotal: "$351 billion",
    gdpPerCapita: "$5,956",
    currency: "South African Rand",
    majorIndustries: "Mining, automobile assembly, metalworking",
    majorExportsImports: "Exports: gold, diamonds; Imports: machinery, petroleum products",
    unemploymentRate: "32.6%",
    giniCoefficient: "63.0",
    hdi: "0.709 (Medium)",
    lifeExpectancy: "64.1 years",
    literacyRate: "87%",
    majorReligions: "Christianity (86%), Traditional African (5.4%)",
    majorEthnicGroups: "Black African (80.2%), Colored (8.8%), White (8.4%), Indian/Asian (2.5%)",
    urbanRuralRatio: "67:33",
  },
  {
    id: 4,
    continent: "Africa",
    country: "Kenya",
    capital: "Nairobi",
    population: "53 million",
    area: "580,367 km²",
    governmentType: "Presidential republic",
    headOfState: "President William Ruto",
    headOfGovernment: "President William Ruto",
    independence: "December 12, 1963",
    adminDivisions: "47 counties",
    gdpTotal: "$98 billion",
    gdpPerCapita: "$1,838",
    currency: "Kenyan Shilling",
    majorIndustries: "Agriculture, tourism, telecommunications",
    majorExportsImports: "Exports: tea, coffee, flowers; Imports: machinery, petroleum products",
    unemploymentRate: "5.7%",
    giniCoefficient: "40.8",
    hdi: "0.601 (Medium)",
    lifeExpectancy: "66.7 years",
    literacyRate: "81.5%",
    majorReligions: "Christianity (85.5%), Islam (10.9%)",
    majorEthnicGroups: "Kikuyu, Luhya, Kalenjin, Luo, Kamba",
    urbanRuralRatio: "28:72",
  },
  {
    id: 5,
    continent: "Africa",
    country: "Morocco",
    capital: "Rabat",
    population: "37 million",
    area: "446,550 km²",
    governmentType: "Constitutional monarchy",
    headOfState: "King Mohammed VI",
    headOfGovernment: "Prime Minister Aziz Akhannouch",
    independence: "March 2, 1956",
    adminDivisions: "12 regions",
    gdpTotal: "$119 billion",
    gdpPerCapita: "$3,204",
    currency: "Moroccan Dirham",
    majorIndustries: "Mining, construction, manufacturing",
    majorExportsImports: "Exports: clothing, fish, chemicals; Imports: crude petroleum, textile fabric",
    unemploymentRate: "11.9%",
    giniCoefficient: "39.5",
    hdi: "0.686 (Medium)",
    lifeExpectancy: "76.7 years",
    literacyRate: "73.8%",
    majorReligions: "Islam (99%), Christianity (1%)",
    majorEthnicGroups: "Arab-Berber (99%), other (1%)",
    urbanRuralRatio: "63:37",
  },
  {
    id: 6,
    continent: "Asia",
    country: "China",
    capital: "Beijing",
    population: "1.4 billion",
    area: "9,596,960 km²",
    governmentType: "Communist party-led state",
    headOfState: "President Xi Jinping",
    headOfGovernment: "Premier Li Qiang",
    independence: "October 1, 1949",
    adminDivisions: "23 provinces, 5 autonomous regions, 4 municipalities",
    gdpTotal: "$14.7 trillion",
    gdpPerCapita: "$10,500",
    currency: "Chinese Yuan (Renminbi)",
    majorIndustries: "Manufacturing, mining, construction",
    majorExportsImports: "Exports: electrical machinery, computers; Imports: electrical machinery, oil",
    unemploymentRate: "5.2%",
    giniCoefficient: "38.5",
    hdi: "0.761 (High)",
    lifeExpectancy: "77.3 years",
    literacyRate: "96.8%",
    majorReligions: "Folk religions (21.9%), Buddhism (18.2%), Christianity (5.1%), Islam (1.8%)",
    majorEthnicGroups: "Han Chinese (91.6%), other (8.4%)",
    urbanRuralRatio: "61:39",
  },
  {
    id: 7,
    continent: "Asia",
    country: "India",
    capital: "New Delhi",
    population: "1.38 billion",
    area: "3,287,263 km²",
    governmentType: "Federal parliamentary constitutional republic",
    headOfState: "President Droupadi Murmu",
    headOfGovernment: "Prime Minister Narendra Modi",
    independence: "August 15, 1947",
    adminDivisions: "28 states and 8 union territories",
    gdpTotal: "$2.9 trillion",
    gdpPerCapita: "$2,100",
    currency: "Indian Rupee",
    majorIndustries: "Textiles, chemicals, food processing",
    majorExportsImports: "Exports: petroleum products, gems; Imports: crude oil, gold",
    unemploymentRate: "7.8%",
    giniCoefficient: "35.7",
    hdi: "0.645 (Medium)",
    lifeExpectancy: "69.7 years",
    literacyRate: "74.4%",
    majorReligions: "Hinduism (79.8%), Islam (14.2%), Christianity (2.3%)",
    majorEthnicGroups: "Indo-Aryan (72%), Dravidian (25%), others (3%)",
    urbanRuralRatio: "35:65",
  },
  {
    id: 8,
    continent: "Asia",
    country: "Japan",
    capital: "Tokyo",
    population: "126 million",
    area: "377,975 km²",
    governmentType: "Unitary parliamentary constitutional monarchy",
    headOfState: "Emperor Naruhito",
    headOfGovernment: "Prime Minister Fumio Kishida",
    independence: "May 3, 1947 (current constitution)",
    adminDivisions: "47 prefectures",
    gdpTotal: "$5.1 trillion",
    gdpPerCapita: "$40,193",
    currency: "Japanese Yen",
    majorIndustries: "Motor vehicles, electronics, machine tools",
    majorExportsImports: "Exports: motor vehicles, semiconductors; Imports: petroleum, liquid natural gas",
    unemploymentRate: "2.6%",
    giniCoefficient: "32.9",
    hdi: "0.919 (Very High)",
    lifeExpectancy: "84.6 years",
    literacyRate: "99%",
    majorReligions: "Shintoism (70.4%), Buddhism (69.8%)",
    majorEthnicGroups: "Japanese (98.1%), Chinese (0.5%), Korean (0.4%)",
    urbanRuralRatio: "91:9",
  },
  {
    id: 9,
    continent: "Asia",
    country: "South Korea",
    capital: "Seoul",
    population: "51 million",
    area: "100,210 km²",
    governmentType: "Unitary presidential constitutional republic",
    headOfState: "President Yoon Suk Yeol",
    headOfGovernment: "Prime Minister Han Duck-soo",
    independence: "August 15, 1945",
    adminDivisions: "9 provinces, 6 metropolitan cities, 1 special city",
    gdpTotal: "$1.6 trillion",
    gdpPerCapita: "$31,489",
    currency: "South Korean Won",
    majorIndustries: "Electronics, telecommunications, automobile production",
    majorExportsImports: "Exports: semiconductors, petrochemicals; Imports: crude oil, semiconductors",
    unemploymentRate: "3.8%",
    giniCoefficient: "31.4",
    hdi: "0.916 (Very High)",
    lifeExpectancy: "83.5 years",
    literacyRate: "97.9%",
    majorReligions: "Christianity (27.6%), Buddhism (15.5%), No religion (56.1%)",
    majorEthnicGroups: "Korean (96%), Chinese (2%), other (2%)",
    urbanRuralRatio: "81:19",
  },
  {
    id: 10,
    continent: "Asia",
    country: "Indonesia",
    capital: "Jakarta",
    population: "273 million",
    area: "1,904,569 km²",
    governmentType: "Presidential republic",
    headOfState: "President Prabowo Subianto",
    headOfGovernment: "President Prabowo Subianto",
    independence: "August 17, 1945",
    adminDivisions: "34 provinces",
    gdpTotal: "$1.1 trillion",
    gdpPerCapita: "$4,038",
    currency: "Indonesian Rupiah",
    majorIndustries: "Petroleum and natural gas, textiles, automotive",
    majorExportsImports: "Exports: coal, palm oil; Imports: petroleum products, machinery",
    unemploymentRate: "5.8%",
    giniCoefficient: "38.2",
    hdi: "0.705 (High)",
    lifeExpectancy: "71.7 years",
    literacyRate: "95.7%",
    majorReligions: "Islam (87.2%), Christianity (9.9%), Hinduism (1.7%)",
    majorEthnicGroups: "Javanese (40.1%), Sundanese (15.5%), Malay (3.7%)",
    urbanRuralRatio: "56:44",
  },
  {
    id: 11,
    continent: "Europe",
    country: "Germany",
    capital: "Berlin",
    population: "83 million",
    area: "357,022 km²",
    governmentType: "Federal parliamentary republic",
    headOfState: "President Frank-Walter Steinmeier",
    headOfGovernment: "Chancellor Olaf Scholz",
    independence: "October 3, 1990 (reunification)",
    adminDivisions: "16 states (Länder)",
    gdpTotal: "$3.8 trillion",
    gdpPerCapita: "$45,724",
    currency: "Euro",
    majorIndustries: "Automotive, mechanical engineering, chemical industry",
    majorExportsImports: "Exports: vehicles, machinery; Imports: machinery, data processing equipment",
    unemploymentRate: "3.1%",
    giniCoefficient: "31.9",
    hdi: "0.947 (Very High)",
    lifeExpectancy: "81.2 years",
    literacyRate: "99%",
    majorReligions: "Christianity (53.9%), No religion (38%), Islam (5.2%)",
    majorEthnicGroups: "German (87%), Turkish (1.8%), Polish (1%), Syrian (1%)",
    urbanRuralRatio: "77:23",
  },
  {
    id: 12,
    continent: "Europe",
    country: "France",
    capital: "Paris",
    population: "67 million",
    area: "551,695 km²",
    governmentType: "Unitary semi-presidential republic",
    headOfState: "President Emmanuel Macron",
    headOfGovernment: "Prime Minister Gabriel Attal",
    independence: "October 4, 1958 (Fifth Republic)",
    adminDivisions: "18 regions",
    gdpTotal: "$2.6 trillion",
    gdpPerCapita: "$38,476",
    currency: "Euro",
    majorIndustries: "Machinery, chemicals, automobiles, electronics",
    majorExportsImports: "Exports: machinery, aircraft; Imports: machinery, vehicles",
    unemploymentRate: "7.1%",
    giniCoefficient: "32.4",
    hdi: "0.901 (Very High)",
    lifeExpectancy: "82.5 years",
    literacyRate: "99%",
    majorReligions: "Christianity (47%), No religion (40%), Islam (8.8%)",
    majorEthnicGroups: "French (85%), other European (7%), North African (8%)",
    urbanRuralRatio: "81:19",
  },
  {
    id: 13,
    continent: "Europe",
    country: "United Kingdom",
    capital: "London",
    population: "67 million",
    area: "242,900 km²",
    governmentType: "Unitary parliamentary constitutional monarchy",
    headOfState: "King Charles III",
    headOfGovernment: "Prime Minister Keir Starmer",
    independence: "May 1, 1707 (Great Britain)",
    adminDivisions: "4 countries, 9 regions, 27 counties",
    gdpTotal: "$2.7 trillion",
    gdpPerCapita: "$40,284",
    currency: "Pound Sterling",
    majorIndustries: "Machine tools, electric power equipment, automation equipment",
    majorExportsImports: "Exports: manufactured goods, fuels; Imports: manufactured goods, machinery",
    unemploymentRate: "3.8%",
    giniCoefficient: "35.1",
    hdi: "0.932 (Very High)",
    lifeExpectancy: "81.2 years",
    literacyRate: "99%",
    majorReligions: "Christianity (59.5%), No religion (25.7%), Islam (4.4%)",
    majorEthnicGroups: "White (87.2%), Asian (7%), Black (3%), Mixed (2%)",
    urbanRuralRatio: "83:17",
  },
  {
    id: 14,
    continent: "Europe",
    country: "Italy",
    capital: "Rome",
    population: "60 million",
    area: "301,340 km²",
    governmentType: "Unitary parliamentary republic",
    headOfState: "President Sergio Mattarella",
    headOfGovernment: "Prime Minister Giorgia Meloni",
    independence: "June 2, 1946",
    adminDivisions: "20 regions",
    gdpTotal: "$1.9 trillion",
    gdpPerCapita: "$31,676",
    currency: "Euro",
    majorIndustries: "Tourism, machinery, iron and steel, chemicals",
    majorExportsImports: "Exports: engineering products, textiles; Imports: engineering products, chemicals",
    unemploymentRate: "7.8%",
    giniCoefficient: "35.9",
    hdi: "0.892 (Very High)",
    lifeExpectancy: "83.6 years",
    literacyRate: "99%",
    majorReligions: "Christianity (83.3%), No religion (12.4%), Islam (3.7%)",
    majorEthnicGroups: "Italian (95%), Romanian (1.8%), African (1.5%), Albanian (1%)",
    urbanRuralRatio: "71:29",
  },
  {
    id: 15,
    continent: "Europe",
    country: "Spain",
    capital: "Madrid",
    population: "47 million",
    area: "505,992 km²",
    governmentType: "Unitary parliamentary constitutional monarchy",
    headOfState: "King Felipe VI",
    headOfGovernment: "Prime Minister Pedro Sánchez",
    independence: "December 6, 1978 (current constitution)",
    adminDivisions: "17 autonomous communities, 2 autonomous cities",
    gdpTotal: "$1.3 trillion",
    gdpPerCapita: "$27,057",
    currency: "Euro",
    majorIndustries: "Textiles and apparel, food and beverages, metals",
    majorExportsImports: "Exports: machinery, motor vehicles; Imports: machinery, fuels",
    unemploymentRate: "12.7%",
    giniCoefficient: "34.7",
    hdi: "0.904 (Very High)",
    lifeExpectancy: "83.4 years",
    literacyRate: "98.4%",
    majorReligions: "Christianity (68.9%), No religion (27.1%), Islam (2.6%)",
    majorEthnicGroups: "Spanish (84.8%), other EU (4.5%), Latin American (4.1%)",
    urbanRuralRatio: "80:20",
  },
  {
    id: 16,
    continent: "North America",
    country: "United States",
    capital: "Washington, D.C.",
    population: "331 million",
    area: "9,833,520 km²",
    governmentType: "Federal presidential constitutional republic",
    headOfState: "President Joe Biden",
    headOfGovernment: "President Joe Biden",
    independence: "July 4, 1776",
    adminDivisions: "50 states, 1 district, 5 territories",
    gdpTotal: "$21 trillion",
    gdpPerCapita: "$63,416",
    currency: "US Dollar",
    majorIndustries: "Petroleum, steel, motor vehicles, aerospace",
    majorExportsImports: "Exports: capital goods, industrial supplies; Imports: consumer goods, industrial supplies",
    unemploymentRate: "3.7%",
    giniCoefficient: "41.5",
    hdi: "0.926 (Very High)",
    lifeExpectancy: "78.5 years",
    literacyRate: "99%",
    majorReligions: "Christianity (65%), No religion (26%), Judaism (2%), Islam (1%)",
    majorEthnicGroups: "White (60.1%), Hispanic (18.5%), Black (13.4%), Asian (5.9%)",
    urbanRuralRatio: "83:17",
  },
  {
    id: 17,
    continent: "North America",
    country: "Canada",
    capital: "Ottawa",
    population: "38 million",
    area: "9,984,670 km²",
    governmentType: "Federal parliamentary constitutional monarchy",
    headOfState: "King Charles III",
    headOfGovernment: "Prime Minister Justin Trudeau",
    independence: "July 1, 1867",
    adminDivisions: "10 provinces, 3 territories",
    gdpTotal: "$1.6 trillion",
    gdpPerCapita: "$42,080",
    currency: "Canadian Dollar",
    majorIndustries: "Transportation equipment, chemicals, minerals",
    majorExportsImports: "Exports: motor vehicles and parts, industrial machinery; Imports: machinery, equipment",
    unemploymentRate: "5.0%",
    giniCoefficient: "33.3",
    hdi: "0.929 (Very High)",
    lifeExpectancy: "82.3 years",
    literacyRate: "99%",
    majorReligions: "Christianity (67.3%), No religion (23.9%), Islam (3.2%)",
    majorEthnicGroups: "European (72.9%), Asian (17.7%), Indigenous (4.9%), other (4.5%)",
    urbanRuralRatio: "81:19",
  },
  {
    id: 18,
    continent: "North America",
    country: "Mexico",
    capital: "Mexico City",
    population: "128 million",
    area: "1,964,375 km²",
    governmentType: "Federal presidential constitutional republic",
    headOfState: "President Claudia Sheinbaum",
    headOfGovernment: "President Claudia Sheinbaum",
    independence: "September 16, 1810",
    adminDivisions: "31 states, 1 federal district",
    gdpTotal: "$1.1 trillion",
    gdpPerCapita: "$8,329",
    currency: "Mexican Peso",
    majorIndustries: "Food and beverages, tobacco, chemicals",
    majorExportsImports: "Exports: manufactured goods, oil; Imports: metalworking machines, agricultural machinery",
    unemploymentRate: "3.3%",
    giniCoefficient: "45.4",
    hdi: "0.779 (High)",
    lifeExpectancy: "75.0 years",
    literacyRate: "95.4%",
    majorReligions: "Christianity (90.4%), No religion (7.6%)",
    majorEthnicGroups: "Mestizo (62%), Indigenous (21%), White (10%), other (7%)",
    urbanRuralRatio: "80:20",
  },
  {
    id: 19,
    continent: "North America",
    country: "Cuba",
    capital: "Havana",
    population: "11 million",
    area: "109,884 km²",
    governmentType: "Unitary communist state",
    headOfState: "President Miguel Díaz-Canel",
    headOfGovernment: "Prime Minister Manuel Marrero Cruz",
    independence: "May 20, 1902",
    adminDivisions: "15 provinces, 1 special municipality",
    gdpTotal: "$100 billion",
    gdpPerCapita: "$8,822",
    currency: "Cuban Peso",
    majorIndustries: "Sugar, petroleum, tobacco, construction",
    majorExportsImports: "Exports: sugar, medical products; Imports: petroleum, food, machinery",
    unemploymentRate: "1.3%",
    giniCoefficient: "38.0",
    hdi: "0.783 (High)",
    lifeExpectancy: "78.8 years",
    literacyRate: "99.8%",
    majorReligions: "Christianity (59%), Folk religions (17%), No religion (23%)",
    majorEthnicGroups: "White (64.1%), Mulatto/Mixed (26.6%), Black (9.3%)",
    urbanRuralRatio: "77:23",
  },
  {
    id: 20,
    continent: "North America",
    country: "Jamaica",
    capital: "Kingston",
    population: "2.9 million",
    area: "10,991 km²",
    governmentType: "Unitary parliamentary constitutional monarchy",
    headOfState: "King Charles III",
    headOfGovernment: "Prime Minister Andrew Holness",
    independence: "August 6, 1962",
    adminDivisions: "14 parishes",
    gdpTotal: "$15 billion",
    gdpPerCapita: "$5,061",
    currency: "Jamaican Dollar",
    majorIndustries: "Tourism, bauxite/alumina, agricultural processing",
    majorExportsImports: "Exports: alumina, bauxite; Imports: food, fuel, machinery",
    unemploymentRate: "7.3%",
    giniCoefficient: "45.5",
    hdi: "0.734 (High)",
    lifeExpectancy: "74.5 years",
    literacyRate: "88.7%",
    majorReligions: "Christianity (64.8%), No religion (21.3%), Rastafarianism (1.1%)",
    majorEthnicGroups: "Black (92.1%), Mixed (6.1%), East Indian (0.8%)",
    urbanRuralRatio: "56:44",
  },
  {
    id: 21,
    continent: "South America",
    country: "Brazil",
    capital: "Brasília",
    population: "212 million",
    area: "8,515,767 km²",
    governmentType: "Federal presidential constitutional republic",
    headOfState: "President Luiz Inácio Lula da Silva",
    headOfGovernment: "President Luiz Inácio Lula da Silva",
    independence: "September 7, 1822",
    adminDivisions: "26 states, 1 federal district",
    gdpTotal: "$1.8 trillion",
    gdpPerCapita: "$8,717",
    currency: "Brazilian Real",
    majorIndustries: "Textiles, shoes, chemicals, cement",
    majorExportsImports: "Exports: transport equipment, iron ore; Imports: machinery, electrical equipment",
    unemploymentRate: "9.3%",
    giniCoefficient: "53.4",
    hdi: "0.765 (High)",
    lifeExpectancy: "75.9 years",
    literacyRate: "93.2%",
    majorReligions: "Christianity (88.8%), No religion (8%), Spiritism (1.3%)",
    majorEthnicGroups: "White (47.7%), Mixed (43.1%), Black (7.6%), Asian (1.1%)",
    urbanRuralRatio: "87:13",
  },
  {
    id: 22,
    continent: "South America",
    country: "Argentina",
    capital: "Buenos Aires",
    population: "45 million",
    area: "2,780,400 km²",
    governmentType: "Federal presidential constitutional republic",
    headOfState: "President Javier Milei",
    headOfGovernment: "President Javier Milei",
    independence: "July 9, 1816",
    adminDivisions: "23 provinces, 1 autonomous city",
    gdpTotal: "$445 billion",
    gdpPerCapita: "$9,912",
    currency: "Argentine Peso",
    majorIndustries: "Food processing, motor vehicles, consumer durables",
    majorExportsImports: "Exports: soybeans, petroleum; Imports: machinery, motor vehicles",
    unemploymentRate: "6.9%",
    giniCoefficient: "42.9",
    hdi: "0.845 (Very High)",
    lifeExpectancy: "76.7 years",
    literacyRate: "99%",
    majorReligions: "Christianity (85.2%), No religion (12.9%), Judaism (1.2%)",
    majorEthnicGroups: "European (97%), Mestizo (2%), Indigenous (1%)",
    urbanRuralRatio: "92:8",
  },
  {
    id: 23,
    continent: "South America",
    country: "Colombia",
    capital: "Bogotá",
    population: "50 million",
    area: "1,141,748 km²",
    governmentType: "Unitary presidential constitutional republic",
    headOfState: "President Gustavo Petro",
    headOfGovernment: "President Gustavo Petro",
    independence: "July 20, 1810",
    adminDivisions: "32 departments, 1 capital district",
    gdpTotal: "$314 billion",
    gdpPerCapita: "$6,104",
    currency: "Colombian Peso",
    majorIndustries: "Textiles, food processing, oil, clothing and footwear",
    majorExportsImports: "Exports: petroleum, coffee; Imports: industrial equipment, transportation equipment",
    unemploymentRate: "11.2%",
    giniCoefficient: "50.4",
    hdi: "0.767 (High)",
    lifeExpectancy: "77.3 years",
    literacyRate: "95.1%",
    majorReligions: "Christianity (92.5%), No religion (6.3%)",
    majorEthnicGroups: "Mestizo and White (87.6%), Afro-Colombian (6.8%), Indigenous (4.3%)",
    urbanRuralRatio: "81:19",
  },
  {
    id: 24,
    continent: "South America",
    country: "Chile",
    capital: "Santiago",
    population: "19 million",
    area: "756,102 km²",
    governmentType: "Unitary presidential constitutional republic",
    headOfState: "President Gabriel Boric",
    headOfGovernment: "President Gabriel Boric",
    independence: "February 12, 1818",
    adminDivisions: "16 regions",
    gdpTotal: "$282 billion",
    gdpPerCapita: "$14,896",
    currency: "Chilean Peso",
    majorIndustries: "Copper, lithium, foodstuffs, fish processing",
    majorExportsImports: "Exports: copper, fruit, fish products; Imports: petroleum, chemicals, electronics",
    unemploymentRate: "8.5%",
    giniCoefficient: "44.4",
    hdi: "0.851 (Very High)",
    lifeExpectancy: "80.2 years",
    literacyRate: "96.4%",
    majorReligions: "Christianity (63.7%), No religion (32.5%)",
    majorEthnicGroups: "White and non-Indigenous (88.9%), Mapuche (9.1%), other Indigenous (2%)",
    urbanRuralRatio: "87:13",
  },
  {
    id: 25,
    continent: "South America",
    country: "Peru",
    capital: "Lima",
    population: "33 million",
    area: "1,285,216 km²",
    governmentType: "Unitary presidential constitutional republic",
    headOfState: "President Dina Boluarte",
    headOfGovernment: "President Dina Boluarte",
    independence: "July 28, 1821",
    adminDivisions: "25 regions",
    gdpTotal: "$222 billion",
    gdpPerCapita: "$6,678",
    currency: "Peruvian Sol",
    majorIndustries: "Mining, manufacturing, agriculture",
    majorExportsImports: "Exports: copper, gold, zinc; Imports: petroleum products, plastics",
    unemploymentRate: "7.4%",
    giniCoefficient: "43.8",
    hdi: "0.762 (High)",
    lifeExpectancy: "76.7 years",
    literacyRate: "94.4%",
    majorReligions: "Christianity (94.6%), No religion (3%)",
    majorEthnicGroups: "Mestizo (60.2%), Quechua (22.3%), White (5.9%), Aymara (2.4%)",
    urbanRuralRatio: "78:22",
  },
  {
    id: 26,
    continent: "Oceania",
    country: "Australia",
    capital: "Canberra",
    population: "25 million",
    area: "7,692,024 km²",
    governmentType: "Federal parliamentary constitutional monarchy",
    headOfState: "King Charles III",
    headOfGovernment: "Prime Minister Anthony Albanese",
    independence: "January 1, 1901",
    adminDivisions: "6 states, 2 major territories",
    gdpTotal: "$1.4 trillion",
    gdpPerCapita: "$55,707",
    currency: "Australian Dollar",
    majorIndustries: "Mining, industrial and transportation equipment",
    majorExportsImports: "Exports: iron ore, coal; Imports: capital goods, consumer goods",
    unemploymentRate: "3.7%",
    giniCoefficient: "34.4",
    hdi: "0.944 (Very High)",
    lifeExpectancy: "83.4 years",
    literacyRate: "99%",
    majorReligions: "Christianity (52.1%), No religion (30.1%), Islam (2.6%)",
    majorEthnicGroups: "English (36.1%), Australian (33.5%), Irish (11.0%), Scottish (9.3%)",
    urbanRuralRatio: "86:14",
  },
  {
    id: 27,
    continent: "Oceania",
    country: "New Zealand",
    capital: "Wellington",
    population: "5 million",
    area: "270,467 km²",
    governmentType: "Unitary parliamentary constitutional monarchy",
    headOfState: "King Charles III",
    headOfGovernment: "Prime Minister Christopher Luxon",
    independence: "September 26, 1907",
    adminDivisions: "16 regions",
    gdpTotal: "$206 billion",
    gdpPerCapita: "$41,072",
    currency: "New Zealand Dollar",
    majorIndustries: "Food processing, textiles, machinery",
    majorExportsImports: "Exports: dairy products, meat; Imports: machinery and equipment, vehicles",
    unemploymentRate: "3.4%",
    giniCoefficient: "33.9",
    hdi: "0.931 (Very High)",
    lifeExpectancy: "82.3 years",
    literacyRate: "99%",
    majorReligions: "Christianity (37.3%), No religion (48.2%), Hinduism (2.6%)",
    majorEthnicGroups: "European (70.2%), Māori (16.5%), Asian (15.1%), Pacific peoples (8.1%)",
    urbanRuralRatio: "86:14",
  },
  {
    id: 28,
    continent: "Europe",
    country: "Russia",
    capital: "Moscow",
    population: "144 million",
    area: "17,098,246 km²",
    governmentType: "Federal semi-presidential constitutional republic",
    headOfState: "President Vladimir Putin",
    headOfGovernment: "Prime Minister Mikhail Mishustin",
    independence: "December 25, 1991",
    adminDivisions: "85 federal subjects",
    gdpTotal: "$1.5 trillion",
    gdpPerCapita: "$10,126",
    currency: "Russian Ruble",
    majorIndustries: "Mining, manufacturing, agriculture, forestry",
    majorExportsImports: "Exports: petroleum and petroleum products, natural gas; Imports: machinery, vehicles",
    unemploymentRate: "4.3%",
    giniCoefficient: "37.5",
    hdi: "0.824 (Very High)",
    lifeExpectancy: "72.7 years",
    literacyRate: "99.7%",
    majorReligions: "Christianity (73%), Islam (15%), No religion (10%)",
    majorEthnicGroups: "Russian (77.7%), Tatar (3.7%), Ukrainian (1.4%), Bashkir (1.1%)",
    urbanRuralRatio: "74:26",
  },
  {
    id: 29,
    continent: "Asia",
    country: "Saudi Arabia",
    capital: "Riyadh",
    population: "34 million",
    area: "2,149,690 km²",
    governmentType: "Unitary Islamic absolute monarchy",
    headOfState: "King Salman bin Abdulaziz",
    headOfGovernment: "Crown Prince Mohammed bin Salman",
    independence: "September 23, 1932",
    adminDivisions: "13 provinces",
    gdpTotal: "$793 billion",
    gdpPerCapita: "$22,700",
    currency: "Saudi Riyal",
    majorIndustries: "Petroleum, petrochemicals, cement",
    majorExportsImports: "Exports: petroleum and petroleum products; Imports: machinery, foodstuffs",
    unemploymentRate: "5.8%",
    giniCoefficient: "45.9",
    hdi: "0.875 (Very High)",
    lifeExpectancy: "75.1 years",
    literacyRate: "97.6%",
    majorReligions: "Islam (93%), Christianity (4.4%)",
    majorEthnicGroups: "Arab (90%), Afro-Asian (10%)",
    urbanRuralRatio: "84:16",
  },
  {
    id: 30,
    continent: "Asia",
    country: "Turkey",
    capital: "Ankara",
    population: "84 million",
    area: "783,356 km²",
    governmentType: "Unitary presidential constitutional republic",
    headOfState: "President Recep Tayyip Erdoğan",
    headOfGovernment: "President Recep Tayyip Erdoğan",
    independence: "October 29, 1923",
    adminDivisions: "81 provinces",
    gdpTotal: "$720 billion",
    gdpPerCapita: "$8,538",
    currency: "Turkish Lira",
    majorIndustries: "Textiles, food processing, automobiles",
    majorExportsImports: "Exports: apparel, foodstuffs; Imports: machinery, chemicals",
    unemploymentRate: "10.7%",
    giniCoefficient: "41.9",
    hdi: "0.820 (Very High)",
    lifeExpectancy: "77.7 years",
    literacyRate: "96.7%",
    majorReligions: "Islam (99.8%), other (0.2%)",
    majorEthnicGroups: "Turkish (70-75%), Kurdish (19%)",
    urbanRuralRatio: "76:24",
  },
  {
    id: 31,
    continent: "Europe",
    country: "Sweden",
    capital: "Stockholm",
    population: "10 million",
    area: "450,295 km²",
    governmentType: "Unitary parliamentary constitutional monarchy",
    headOfState: "King Carl XVI Gustaf",
    headOfGovernment: "Prime Minister Ulf Kristersson",
    independence: "June 6, 1523",
    adminDivisions: "21 counties",
    gdpTotal: "$531 billion",
    gdpPerCapita: "$51,615",
    currency: "Swedish Krona",
    majorIndustries: "Iron and steel, precision equipment, wood pulp and paper products",
    majorExportsImports: "Exports: machinery, motor vehicles; Imports: machinery, petroleum products",
    unemploymentRate: "7.5%",
    giniCoefficient: "30.0",
    hdi: "0.947 (Very High)",
    lifeExpectancy: "82.8 years",
    literacyRate: "99%",
    majorReligions: "Christianity (57.7%), No religion (30.4%), Islam (8.1%)",
    majorEthnicGroups: "Swedish (80.3%), Syrian (1.9%), Finnish (1.4%), Iraqi (1.4%)",
    urbanRuralRatio: "88:12",
  },
  {
    id: 32,
    continent: "Africa",
    country: "Ethiopia",
    capital: "Addis Ababa",
    population: "115 million",
    area: "1,104,300 km²",
    governmentType: "Federal parliamentary republic",
    headOfState: "President Sahle-Work Zewde",
    headOfGovernment: "Prime Minister Abiy Ahmed",
    independence: "May 5, 1941",
    adminDivisions: "10 regions, 2 chartered cities",
    gdpTotal: "$96 billion",
    gdpPerCapita: "$936",
    currency: "Ethiopian Birr",
    majorIndustries: "Food processing, beverages, textiles",
    majorExportsImports: "Exports: coffee, oilseeds; Imports: food and live animals, petroleum",
    unemploymentRate: "19.1%",
    giniCoefficient: "35.0",
    hdi: "0.498 (Low)",
    lifeExpectancy: "67.5 years",
    literacyRate: "51.8%",
    majorReligions: "Christianity (62.8%), Islam (33.9%), Traditional faiths (2.6%)",
    majorEthnicGroups: "Oromo (34.9%), Amhara (27.9%), Tigray (7.3%), Sidama (4.1%)",
    urbanRuralRatio: "21:79",
  },
  {
    id: 33,
    continent: "Africa",
    country: "Ghana",
    capital: "Accra",
    population: "31 million",
    area: "238,533 km²",
    governmentType: "Unitary presidential constitutional republic",
    headOfState: "President Nana Akufo-Addo",
    headOfGovernment: "President Nana Akufo-Addo",
    independence: "March 6, 1957",
    adminDivisions: "16 regions",
    gdpTotal: "$68 billion",
    gdpPerCapita: "$2,202",
    currency: "Ghanaian Cedi",
    majorIndustries: "Mining, lumbering, light manufacturing",
    majorExportsImports: "Exports: gold, cocoa, timber; Imports: capital equipment, petroleum",
    unemploymentRate: "4.5%",
    giniCoefficient: "43.5",
    hdi: "0.611 (Medium)",
    lifeExpectancy: "64.1 years",
    literacyRate: "79%",
    majorReligions: "Christianity (71.2%), Islam (17.6%), Traditional (5.2%)",
    majorEthnicGroups: "Akan (47.5%), Mole-Dagbon (16.6%), Ewe (13.9%), Ga-Dangme (7.4%)",
    urbanRuralRatio: "57:43",
  },
  {
    id: 34,
    continent: "Asia",
    country: "Vietnam",
    capital: "Hanoi",
    population: "97 million",
    area: "331,212 km²",
    governmentType: "Unitary Marxist-Leninist one-party socialist republic",
    headOfState: "President Tô Lâm",
    headOfGovernment: "Prime Minister Phạm Minh Chính",
    independence: "September 2, 1945",
    adminDivisions: "58 provinces, 5 municipalities",
    gdpTotal: "$261 billion",
    gdpPerCapita: "$2,715",
    currency: "Vietnamese Đồng",
    majorIndustries: "Food processing, garments, shoes, machine building",
    majorExportsImports: "Exports: clothes, shoes, electronics; Imports: machinery, petroleum products",
    unemploymentRate: "2.2%",
    giniCoefficient: "35.7",
    hdi: "0.703 (High)",
    lifeExpectancy: "75.4 years",
    literacyRate: "95.4%",
    majorReligions: "Vietnamese folk religion (45.3%), Buddhism (16.4%), Christianity (8.2%)",
    majorEthnicGroups: "Kinh (85.7%), Tay (1.9%), Thai (1.8%), Muong (1.5%)",
    urbanRuralRatio: "37:63",
  },
  {
    id: 35,
    continent: "Asia",
    country: "Thailand",
    capital: "Bangkok",
    population: "70 million",
    area: "513,120 km²",
    governmentType: "Unitary parliamentary constitutional monarchy",
    headOfState: "King Maha Vajiralongkorn",
    headOfGovernment: "Prime Minister Srettha Thavisin",
    independence: "Never colonized",
    adminDivisions: "76 provinces, 1 special administrative area",
    gdpTotal: "$505 billion",
    gdpPerCapita: "$7,233",
    currency: "Thai Baht",
    majorIndustries: "Tourism, textiles and garments, agricultural processing",
    majorExportsImports: "Exports: automobiles, computers; Imports: capital goods, raw materials",
    unemploymentRate: "1.5%",
    giniCoefficient: "36.4",
    hdi: "0.800 (Very High)",
    lifeExpectancy: "77.7 years",
    literacyRate: "93.8%",
    majorReligions: "Buddhism (94.6%), Islam (4.3%)",
    majorEthnicGroups: "Thai (97.5%), Burmese (1.3%), others (1.2%)",
    urbanRuralRatio: "51:49",
  },
  {
    id: 36,
    continent: "Europe",
    country: "Poland",
    capital: "Warsaw",
    population: "38 million",
    area: "312,696 km²",
    governmentType: "Unitary semi-presidential constitutional republic",
    headOfState: "President Andrzej Duda",
    headOfGovernment: "Prime Minister Donald Tusk",
    independence: "November 11, 1918",
    adminDivisions: "16 voivodeships",
    gdpTotal: "$595 billion",
    gdpPerCapita: "$15,721",
    currency: "Polish Złoty",
    majorIndustries: "Machine building, iron and steel, coal mining",
    majorExportsImports: "Exports: machinery, furniture; Imports: machinery, transport equipment",
    unemploymentRate: "2.8%",
    giniCoefficient: "30.2",
    hdi: "0.876 (Very High)",
    lifeExpectancy: "78.5 years",
    literacyRate: "99.8%",
    majorReligions: "Christianity (87.7%), No religion (10.1%)",
    majorEthnicGroups: "Polish (97%), Silesian (1%), German (0.2%)",
    urbanRuralRatio: "60:40",
  },
  {
    id: 37,
    continent: "Europe",
    country: "Ukraine",
    capital: "Kyiv",
    population: "44 million",
    area: "603,500 km²",
    governmentType: "Unitary semi-presidential constitutional republic",
    headOfState: "President Volodymyr Zelenskyy",
    headOfGovernment: "Prime Minister Denys Shmyhal",
    independence: "August 24, 1991",
    adminDivisions: "24 oblasts, 1 autonomous republic, 2 cities with special status",
    gdpTotal: "$155 billion",
    gdpPerCapita: "$3,726",
    currency: "Ukrainian Hryvnia",
    majorIndustries: "Coal, electric power, ferrous and nonferrous metals",
    majorExportsImports:
      "Exports: ferrous and nonferrous metals, fuel and petroleum products; Imports: energy, machinery",
    unemploymentRate: "9.8%",
    giniCoefficient: "26.6",
    hdi: "0.773 (High)",
    lifeExpectancy: "72.0 years",
    literacyRate: "99.8%",
    majorReligions: "Christianity (87.3%), No religion (11.0%)",
    majorEthnicGroups: "Ukrainian (77.8%), Russian (17.3%), Belarusian (0.6%)",
    urbanRuralRatio: "69:31",
  },
  {
    id: 38,
    continent: "Asia",
    country: "Iran",
    capital: "Tehran",
    population: "83 million",
    area: "1,648,195 km²",
    governmentType: "Unitary Islamic theocratic republic",
    headOfState: "Supreme Leader Ali Khamenei",
    headOfGovernment: "President Masoud Pezeshkian",
    independence: "April 1, 1979",
    adminDivisions: "31 provinces",
    gdpTotal: "$1.1 trillion",
    gdpPerCapita: "$12,725",
    currency: "Iranian Rial",
    majorIndustries: "Petroleum, petrochemicals, fertilizers",
    majorExportsImports: "Exports: petroleum, chemical products; Imports: industrial supplies, capital goods",
    unemploymentRate: "9.6%",
    giniCoefficient: "40.8",
    hdi: "0.774 (High)",
    lifeExpectancy: "76.7 years",
    literacyRate: "85.5%",
    majorReligions: "Islam (99.4%), other (0.6%)",
    majorEthnicGroups: "Persian (61%), Azeri (16%), Kurd (10%), Lur (6%)",
    urbanRuralRatio: "75:25",
  },
  {
    id: 39,
    continent: "Asia",
    country: "Pakistan",
    capital: "Islamabad",
    population: "220 million",
    area: "881,913 km²",
    governmentType: "Federal parliamentary constitutional republic",
    headOfState: "President Asif Ali Zardari",
    headOfGovernment: "Prime Minister Shehbaz Sharif",
    independence: "August 14, 1947",
    adminDivisions: "4 provinces, 2 autonomous territories, 1 federal territory",
    gdpTotal: "$340 billion",
    gdpPerCapita: "$1,543",
    currency: "Pakistani Rupee",
    majorIndustries: "Textiles and apparel, food processing, pharmaceuticals",
    majorExportsImports: "Exports: textiles, rice; Imports: petroleum, machinery",
    unemploymentRate: "6.2%",
    giniCoefficient: "33.5",
    hdi: "0.544 (Low)",
    lifeExpectancy: "67.3 years",
    literacyRate: "59%",
    majorReligions: "Islam (96.5%), Christianity (1.6%), Hinduism (1.6%)",
    majorEthnicGroups: "Punjabi (44.7%), Pashtun (15.4%), Sindhi (14.1%), Saraiki (8.4%)",
    urbanRuralRatio: "37:63",
  },
  {
    id: 40,
    continent: "South America",
    country: "Venezuela",
    capital: "Caracas",
    population: "28.4 million",
    area: "916,445 km²",
    governmentType: "Federal presidential republic",
    headOfState: "President Nicolás Maduro",
    headOfGovernment: "President Nicolás Maduro",
    independence: "July 5, 1811",
    adminDivisions: "23 states, 1 capital district, 1 federal dependency",
    gdpTotal: "$76 billion",
    gdpPerCapita: "$2,442",
    currency: "Venezuelan Bolívar",
    majorIndustries: "Petroleum, construction materials, food processing",
    majorExportsImports: "Exports: petroleum, bauxite, aluminum; Imports: agricultural products, raw materials",
    unemploymentRate: "6.4%",
    giniCoefficient: "44.8",
    hdi: "0.711 (High)",
    lifeExpectancy: "72.1 years",
    literacyRate: "97.1%",
    majorReligions: "Christianity (96%), No religion (2%)",
    majorEthnicGroups: "Mestizo (51.6%), White (43.6%), Black (3.6%), Indigenous (2.7%)",
    urbanRuralRatio: "88:12",
  },
  {
    id: 41,
    continent: "Africa",
    country: "Tanzania",
    capital: "Dodoma",
    population: "59 million",
    area: "945,087 km²",
    governmentType: "Unitary presidential constitutional republic",
    headOfState: "President Samia Suluhu Hassan",
    headOfGovernment: "Prime Minister Kassim Majaliwa",
    independence: "December 9, 1961",
    adminDivisions: "31 regions",
    gdpTotal: "$63 billion",
    gdpPerCapita: "$1,077",
    currency: "Tanzanian Shilling",
    majorIndustries: "Agricultural processing, mining, oil refining",
    majorExportsImports: "Exports: gold, coffee, cashew nuts; Imports: consumer goods, machinery",
    unemploymentRate: "2.2%",
    giniCoefficient: "40.5",
    hdi: "0.549 (Low)",
    lifeExpectancy: "65.5 years",
    literacyRate: "77.9%",
    majorReligions: "Christianity (61.4%), Islam (35.2%), Folk religion (1.8%)",
    majorEthnicGroups: "African (99%), other (1%)",
    urbanRuralRatio: "35:65",
  },
  {
    id: 42,
    continent: "Africa",
    country: "Algeria",
    capital: "Algiers",
    population: "43 million",
    area: "2,381,741 km²",
    governmentType: "Unitary semi-presidential republic",
    headOfState: "President Abdelmadjid Tebboune",
    headOfGovernment: "Prime Minister Nadir Larbaoui",
    independence: "July 5, 1962",
    adminDivisions: "58 provinces",
    gdpTotal: "$167 billion",
    gdpPerCapita: "$3,765",
    currency: "Algerian Dinar",
    majorIndustries: "Petroleum, natural gas, light industries",
    majorExportsImports: "Exports: petroleum, natural gas; Imports: capital goods, foodstuffs",
    unemploymentRate: "11.7%",
    giniCoefficient: "27.6",
    hdi: "0.748 (High)",
    lifeExpectancy: "76.9 years",
    literacyRate: "81.4%",
    majorReligions: "Islam (99%), Christianity and Judaism (1%)",
    majorEthnicGroups: "Arab-Berber (99%), European (<1%)",
    urbanRuralRatio: "73:27",
  },
]

// Get unique continents for filter
const continents = [...new Set(rows.map((row) => row.continent))]

// Define TypeScript interfaces for the data
interface CountryData {
  id: number;
  continent: string;
  country: string;
  capital: string;
  population: string;
  area: string;
  governmentType: string;
  headOfState: string;
  headOfGovernment: string;
  independence: string;
  adminDivisions: string;
  gdpTotal: string;
  gdpPerCapita: string;
  currency: string;
  majorIndustries: string;
  majorExportsImports: string;
  unemploymentRate: string;
  giniCoefficient: string;
  hdi: string;
  lifeExpectancy: string;
  literacyRate: string;
  majorReligions: string;
  majorEthnicGroups: string;
  urbanRuralRatio: string;
}

// Fix TypeScript errors in the SimpleDataGrid component
export default function SimpleDataGrid() {
  const [searchFocused, setSearchFocused] = useState(false);
  const [searchText, setSearchText] = useState("");
  const [filteredRows, setFilteredRows] = useState<CountryData[]>(rows);
  const [showSearchBar, setShowSearchBar] = useState(true); // Set to true by default
  const [filterAnchorEl, setFilterAnchorEl] = useState<HTMLElement | null>(null);
  const [selectedContinents, setSelectedContinents] = useState<string[]>([]);
  const [selectedCountry, setSelectedCountry] = useState<CountryData | null>(null);
  const [modalOpen, setModalOpen] = useState(false);
  // State for selected rows - changed from string[] to GridRowId[]
  const [selectionModel, setSelectionModel] = useState<any[]>([]);

  const open = Boolean(filterAnchorEl);
  
  // Custom cell renderer for truncating cell text to 2 lines
  const TruncatedCell = (props: any) => {
    const { value } = props;
    return (
      <div 
        style={{ 
          overflow: 'hidden',
          textOverflow: 'ellipsis',
          display: '-webkit-box',
          WebkitLineClamp: 2,
          WebkitBoxOrient: 'vertical',
          lineHeight: '1.3em',
          maxHeight: '2.6em' // Approximately 2 lines
        }}>
        {value}
      </div>
    );
  };

  // Define column groups inside the component to access selectedRows state
  const columns = [
    // Custom checkbox selection column
    {
      field: 'selection',
      headerName: '',
      width: 50,
      sortable: false,
      filterable: false,
      disableColumnMenu: true,
      headerAlign: 'center',
      align: 'center',
      pinnable: true,
      columnPinningPosition: 'left',
      renderHeader: (params) => {
        // Get row count directly from filteredRows instead of using apiRef
        const rowCount = filteredRows.length;
        const selectedRowCount = selectionModel.length;
        
        return (
          <Checkbox 
            indeterminate={selectedRowCount > 0 && selectedRowCount < rowCount}
            checked={rowCount > 0 && selectedRowCount === rowCount}
            onChange={(event) => {
              if (selectedRowCount === rowCount) {
                setSelectionModel([]);
              } else {
                // Get all row IDs directly from filteredRows
                const allRowIds = filteredRows.map(row => row.id);
                setSelectionModel(allRowIds);
              }
            }}
            sx={{
              '&.Mui-checked': { color: '#1D9F9F' },
              '&.MuiCheckbox-indeterminate': { color: '#1D9F9F' },
              padding: 0,
            }}
            size="small"
          />
        );
      },
      renderCell: (params) => (
        <Box sx={{ 
          display: 'flex', 
          justifyContent: 'center', 
          alignItems: 'center', 
          width: '100%',
          height: '100%'
        }}>
          <Checkbox 
            checked={selectionModel.includes(params.id)}
            onChange={(event) => {
              const newSelectionModel = [...selectionModel];
              if (event.target.checked) {
                newSelectionModel.push(params.id);
              } else {
                const index = newSelectionModel.indexOf(params.id);
                if (index > -1) {
                  newSelectionModel.splice(index, 1);
                }
              }
              setSelectionModel(newSelectionModel);
            }}
            sx={{
              '&.Mui-checked': { color: '#1D9F9F' },
              padding: 0,
            }}
            size="small"
          />
        </Box>
      ),
    },
    
    // Basic Information - Using custom cell renderer for all text columns
    { field: "continent", headerName: "Continent", width: 150, renderCell: TruncatedCell },
    { field: "country", headerName: "Country", width: 180, renderCell: TruncatedCell },
    { field: "capital", headerName: "Capital", width: 150, renderCell: TruncatedCell },
    { field: "population", headerName: "Population", width: 150, renderCell: TruncatedCell },
    { field: "area", headerName: "Area", width: 150, renderCell: TruncatedCell },

    // Political Information
    { field: "governmentType", headerName: "Government Type", width: 220, renderCell: TruncatedCell },
    { field: "headOfState", headerName: "Head of State", width: 200, renderCell: TruncatedCell },
    { field: "headOfGovernment", headerName: "Head of Government", width: 200, renderCell: TruncatedCell },
    { field: "independence", headerName: "Independence/Formation", width: 200, renderCell: TruncatedCell },
    { field: "adminDivisions", headerName: "Administrative Divisions", width: 220, renderCell: TruncatedCell },

    // Economic Information
    { field: "gdpTotal", headerName: "GDP (Total)", width: 150, renderCell: TruncatedCell },
    { field: "gdpPerCapita", headerName: "GDP per Capita", width: 150, renderCell: TruncatedCell },
    { field: "currency", headerName: "Currency", width: 150, renderCell: TruncatedCell },
    { field: "majorIndustries", headerName: "Major Industries", width: 250, renderCell: TruncatedCell },
    { field: "majorExportsImports", headerName: "Major Exports/Imports", width: 300, renderCell: TruncatedCell },
    { field: "unemploymentRate", headerName: "Unemployment Rate", width: 170, renderCell: TruncatedCell },
    { field: "giniCoefficient", headerName: "Gini Coefficient", width: 150, renderCell: TruncatedCell },

    // Social Information
    { field: "hdi", headerName: "Human Development Index", width: 200, renderCell: TruncatedCell },
    { field: "lifeExpectancy", headerName: "Life Expectancy", width: 150, renderCell: TruncatedCell },
    { field: "literacyRate", headerName: "Literacy Rate", width: 150, renderCell: TruncatedCell },
    { field: "majorReligions", headerName: "Major Religions", width: 300, renderCell: TruncatedCell },
    { field: "majorEthnicGroups", headerName: "Major Ethnic Groups", width: 300, renderCell: TruncatedCell },
    { field: "urbanRuralRatio", headerName: "Urban/Rural Ratio", width: 150, renderCell: TruncatedCell },
    // Actions column
    {
      field: "actions",
      headerName: "",
      width: 50,
      sortable: false,
      filterable: false,
      disableColumnMenu: true,
      pinnable: true,
      // Use the correct syntax and value format for pinning in MUI DataGridPro
      columnPinningPosition: 'right',
      renderCell: (params: any) => {
        const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);

        const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
          setAnchorEl(event.currentTarget);
        };

        const handleClose = () => {
          setAnchorEl(null);
        };

        const handleExpandModal = () => {
          // Logic for expanding to modal would go here
          handleClose();
        };

        const handleEdit = () => {
          // Logic for editing would go here
          handleClose();
        };

        const handleDelete = () => {
          // Logic for deleting would go here
          handleClose();
        };

        return (
          <>
            <IconButton size="small" onClick={handleClick}>
              <MoreVert fontSize="small" />
            </IconButton>
            <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleClose}>
              <MenuItem onClick={handleExpandModal}>
                <Fullscreen fontSize="small" style={{ marginRight: 8 }} />
                Expand to modal
              </MenuItem>
              <MenuItem onClick={handleEdit}>
                <Edit fontSize="small" style={{ marginRight: 8 }} />
                Edit
              </MenuItem>
              <MenuItem onClick={handleDelete}>
                <Delete fontSize="small" style={{ marginRight: 8 }} />
                Trash
              </MenuItem>
            </Menu>
          </>
        );
      },
    },
  ];

  // Handle search input changes
  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setSearchText(value);
    filterData(value, selectedContinents);
  };

  // Toggle search bar visibility
  const toggleSearchBar = () => {
    setShowSearchBar(!showSearchBar);
    if (showSearchBar) {
      // Clear search
      setSearchText("");
      filterData("", selectedContinents);
    }
  };

  // Handle filter menu
  const handleFilterClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setFilterAnchorEl(event.currentTarget);
  };

  const handleFilterClose = () => {
    setFilterAnchorEl(null);
  };

  const handleContinentToggle = (continent: string) => {
    const currentIndex = selectedContinents.indexOf(continent);
    const newSelectedContinents = [...selectedContinents];

    if (currentIndex === -1) {
      newSelectedContinents.push(continent);
    } else {
      newSelectedContinents.splice(currentIndex, 1);
    }

    setSelectedContinents(newSelectedContinents);
    filterData(searchText, newSelectedContinents);
  };

  // Filter data based on search text and selected continents
  const filterData = (search: string, continents: string[]) => {
    let filtered = rows;

    // Apply continent filter
    if (continents.length > 0) {
      filtered = filtered.filter((row) => continents.includes(row.continent));
    }

    // Apply search filter
    if (search) {
      const lowercasedFilter = search.toLowerCase();
      filtered = filtered.filter((item) => {
        return Object.keys(item).some((key) => {
          if (key === "id") return false;
          const value = item[key as keyof typeof item];
          return value && String(value).toLowerCase().includes(lowercasedFilter);
        });
      });
    }

    setFilteredRows(filtered);
  };

  // Handle country modal
  const handleOpenModal = (country: CountryData) => {
    setSelectedCountry(country);
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
  };

  // Handle row selection
  const handleSelectionModelChange = (newSelectionModel: any) => {
    setSelectionModel(newSelectionModel);
  };

  // Clear selection
  const handleClearSelection = () => {
    setSelectionModel([]);
  };

  return (
    <Paper
      sx={{
        width: "100%",
        overflow: "hidden",
        fontFamily: "Helvetica, Arial, sans-serif",
        position: "relative",
        boxShadow: "0px 8px 30px -15px rgba(0,0,0,0.15), 0px 15px 40px -20px rgba(0,0,0,0.1)",
        borderRadius: "8px",
      }}
    >
      {/* Selection Header - Slides down when items are selected */}
      <Slide direction="down" in={selectionModel.length > 0} mountOnEnter unmountOnExit>
        <Paper 
          elevation={0}
          sx={{
            position: "absolute", 
            top: 0, 
            left: 0, 
            right: 0, 
            zIndex: 2,
            backgroundColor: "#E0F1F2",
            display: "flex",
            alignItems: "center",
            px: 2,
            height: "52px",
            borderBottom: "1px solid #1D9F9F",
            borderRadius: "4px 4px 0 0"
          }}
        >
          <IconButton 
            size="small"
            sx={{ color: "#00726E" }}
            onClick={handleClearSelection}
          >
            <Close fontSize="small" />
          </IconButton>
          
          <Typography sx={{ color: "#00726E", fontWeight: "medium", ml: 1.5 }}>
            {selectionModel.length} {selectionModel.length === 1 ? "item" : "items"} selected
          </Typography>
          
          {/* Use flex-grow to push the action buttons to the right */}
          <Box sx={{ flex: 1 }} />
          
          <Box sx={{ display: "flex", gap: 1 }}>
            <IconButton 
              size="small"
              sx={{ color: "#00726E" }}
              onClick={() => {/* Download action */}}
            >
              <Download fontSize="small" />
            </IconButton>
            <IconButton 
              size="small"
              sx={{ color: "#00726E" }}
              onClick={() => {/* Edit action */}}
            >
              <Edit fontSize="small" />
            </IconButton>
            <IconButton 
              size="small"
              sx={{ color: "#00726E" }}
              onClick={() => {/* Delete action */}}
            >
              <Delete fontSize="small" />
            </IconButton>
          </Box>
        </Paper>
      </Slide>

      {/* Main header */}
      <Toolbar
        sx={{
          p: 1,
          display: "flex",
          justifyContent: "space-between",
          borderBottom: "1px solid #e0e0e0",
          height: "52px",
          minHeight: "52px !important",
        }}
      >
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <Typography
            variant="subtitle1"
            component="div"
            sx={{
              fontWeight: 700,
              fontSize: "16px",
              fontFamily: "Helvetica, Arial, sans-serif",
            }}
          >
            World Geography
          </Typography>
          <Tooltip title="This table displays geographic information about countries around the world, organized by continent.">
            <IconButton size="small" sx={{ ml: 0.5 }}>
              <InfoOutlined fontSize="small" />
            </IconButton>
          </Tooltip>
        </Box>

        {/* Right side icons */}
        <Box sx={{ display: "flex", gap: 1 }}>
          <IconButton
            onClick={toggleSearchBar}
            sx={{
              width: "36px",
              height: "36px",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              ...(showSearchBar && {
                backgroundColor: "#E0F1F2",
                color: "#00726E",
                "&:hover": {
                  backgroundColor: "#d0e8e9",
                },
              }),
            }}
          >
            <Search sx={{ fontSize: "20px" }} />
          </IconButton>
          <IconButton
            onClick={handleFilterClick}
            sx={{
              width: "36px",
              height: "36px",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              position: "relative",
              ...(selectedContinents.length > 0 && {
                backgroundColor: "#E0F1F2",
                color: "#00726E",
                "&:hover": {
                  backgroundColor: "#d0e8e9",
                },
              }),
            }}
          >
            <FilterAlt sx={{ fontSize: "20px" }} />
            {selectedContinents.length > 0 && (
              <Box
                sx={{
                  position: "absolute",
                  top: -4,
                  right: -4,
                  bgcolor: "#00726E",
                  color: "white",
                  width: 16,
                  height: 16,
                  borderRadius: "50%",
                  fontSize: "11px",
                  fontWeight: "bold",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  border: "1px solid white",
                }}
              >
                {selectedContinents.length}
              </Box>
            )}
          </IconButton>
          <Menu
            anchorEl={filterAnchorEl}
            open={open}
            onClose={handleFilterClose}
            PaperProps={{
              style: {
                maxHeight: 300,
                width: 200,
              },
            }}
          >
            {continents.map((continent) => (
              <MenuItem key={continent} dense>
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={selectedContinents.includes(continent)}
                      onChange={() => handleContinentToggle(continent)}
                      size="small"
                      sx={{
                        '&.Mui-checked': { color: '#1D9F9F' },
                        '&:hover': { backgroundColor: 'rgba(29, 159, 159, 0.04)' },
                      }}
                    />
                  }
                  label={continent}
                  sx={{ width: "100%" }}
                />
              </MenuItem>
            ))}
          </Menu>
        </Box>
      </Toolbar>

      {/* Search/Filter row - collapsible */}
      {showSearchBar && (
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            borderBottom: searchFocused ? "2px solid #009688" : "1px solid #e0e0e0",
            transition: "border-bottom 0.2s",
            height: "52px",
          }}
        >
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              width: "100%",
              px: 2,
              height: "100%",
            }}
          >
            <Search
              fontSize="small"
              sx={{
                color: "action.active",
                mr: 1,
                opacity: 0.7,
              }}
            />
            <TextField
              variant="standard"
              placeholder="Find"
              fullWidth
              value={searchText}
              onChange={handleSearchChange}
              onFocus={() => setSearchFocused(true)}
              onBlur={() => setSearchFocused(false)}
              InputProps={{
                disableUnderline: true,
                style: { fontFamily: "Helvetica, Arial, sans-serif" },
              }}
              sx={{
                height: "100%",
                "& .MuiInputBase-root": {
                  height: "100%",
                  fontFamily: "Helvetica, Arial, sans-serif",
                },
              }}
            />
          </Box>
        </Box>
      )}

      {/* Data Grid */}
      <Box sx={{ height: 600, width: "100%", position: "relative" }}>
        {/* Removed fixed-position dividers in favor of dynamic ones in the DataGrid sx prop */}
        <GridComponent
          rows={filteredRows}
          columns={columns}
          initialState={{
            pagination: {
              paginationModel: { page: 0, pageSize: 25 },
            },
            columns: {
              columnVisibilityModel: {
                actions: true,
              },
            },
            pinnedColumns: {
              left: ['selection'],
              right: ['actions']
            }
          }}
          pageSizeOptions={[5, 10, 25, 50, 100]}
          pagination
          paginationMode="client"
          checkboxSelection={false}
          disableRowSelectionOnClick
          getRowHeight={() => 'auto'}
          getEstimatedRowHeight={() => 100}
          density="standard"
          onRowSelectionModelChange={handleSelectionModelChange}
          components={{
            BaseRoot: (props) => (
              <div
                {...props}
                style={{
                  ...props.style,
                  '--pinned-border': '1px solid #e0e0e0',
                  '--pinned-shadow': '0px 0px 4px 0px rgba(0,0,0,0.1)',
                }}
              />
            )
          }}
          componentsProps={{
            basePopper: {
              sx: {
                zIndex: 1000,
              }
            },
          }}
          sx={{
            fontFamily: "Helvetica, Arial, sans-serif",
            height: "100%", 
            width: "100%",
            boxSizing: "border-box",
            "& .MuiDataGrid-columnHeaders": {
              backgroundColor: "#f5f5f5",
              position: "sticky",
              top: 0,
              zIndex: 1,
              height: "52px !important",
              minHeight: "52px !important",
              maxHeight: "52px !important",
              lineHeight: "52px",
              borderBottom: "1px solid #e0e0e0 !important", 
              "& .MuiDataGrid-columnHeaderTitle": {
                fontWeight: "bold",
                fontFamily: "Helvetica, Arial, sans-serif",
                fontSize: "14px",
              },
            },
            // Target the column separator elements with direct attribute selectors to override inline styles
            "& .MuiDataGrid-columnSeparator": {
              visibility: "visible", // Make sure the separators are visible
            },
            "& .MuiDataGrid-iconSeparator": {
              color: "#e0e0e0", // Light gray color that matches MUI's default
            },
            // Remove any custom overrides that might be hiding the separators
            "& .MuiDataGrid-columnSeparator--sideRight::after": {
              display: "unset",
            },
            // Remove vertical borders that might interfere with column separators
            "& .MuiDataGrid-cell, & .MuiDataGrid-columnHeader": {
              border: "none",
              borderBottom: "1px solid #e0e0e0",
            },
            "& .MuiDataGrid-row": {
              maxHeight: "none !important",
              lineHeight: "normal",
              margin: 0, // Remove any margin between rows
            },
            "& .MuiDataGrid-cell": {
              overflow: "hidden !important", // Changed from visible to hidden
              whiteSpace: "normal",
              borderBottom: "1px solid #e0e0e0", // Darker row dividers for better visibility
              borderTop: "none", // Remove any top border
              fontFamily: "Helvetica, Arial, sans-serif",
              padding: 1,
              // Set a fixed height for all cells with display: -webkit-box for line clamping
              height: "auto !important",
              maxHeight: "72px !important", // Limit maximum height
              display: "flex",
              alignItems: "center", 
              justifyContent: "flex-start",
              margin: 0, // Remove any margin
              "& .MuiBox-root": {
                display: "flex",
                alignItems: "center",
                width: "100%",
                height: "100%",
              },
              "& p, & span, & div:not(.MuiBox-root)": {
                margin: 0,
                alignSelf: "center",
                // Apply text truncation with ellipsis after 2 lines
                display: "-webkit-box",
                WebkitLineClamp: 2,
                WebkitBoxOrient: "vertical",
                overflow: "hidden",
                textOverflow: "ellipsis",
                width: "100%",
              }
            },
            "& .MuiDataGrid-virtualScroller": {
              marginTop: "0 !important", // Remove gap after the header
              "& .MuiDataGrid-virtualScrollerContent": {
                 marginBottom: 0,
              },
              "& .MuiDataGrid-virtualScrollerRenderZone": {
                gap: 0, // Remove gaps between rows
              }
            },
            "& .MuiDataGrid-cell:focus-within": {
              outline: "none",
            },
            border: "none",
            "& .MuiTablePagination-root": {
              fontFamily: "Helvetica, Arial, sans-serif",
              borderTop: "1px solid #e0e0e0",
            },
            "& .MuiTablePagination-selectLabel": {
              marginBottom: 0,
              display: "flex",
              alignItems: "center",
            },
            "& .MuiTablePagination-select": {
              marginLeft: 1,
              marginRight: 1,
            },
            "& .MuiTablePagination-displayedRows": {
              marginBottom: 0,
              marginLeft: 8,
            },
            "& .MuiTablePagination-spacer": {
              flex: 1,
              minWidth: 80,
            },
            "& .MuiTablePagination-toolbar": {
              display: "flex",
              justifyContent: "space-between",
              "& > div:first-of-type": {
                marginRight: 4,
              }
            },
            // Add borders to pinned columns with MUI's medium soft shadow
            "& .MuiDataGrid-pinnedColumnHeaders, & .MuiDataGrid-pinnedColumns": {
              position: "relative",
              zIndex: 50,
              "&.MuiDataGrid-pinnedColumns--left": {
                borderRight: "1px solid #e0e0e0",
                boxShadow: "0px 3px 5px -1px rgba(0,0,0,0.1), 0px 6px 10px 0px rgba(0,0,0,0.04), 0px 1px 18px 0px rgba(0,0,0,0.02)",
                "&::after": {
                  content: '""',
                  position: "absolute",
                  top: 0,
                  right: 0,
                  bottom: 0,
                  width: "1px",
                  backgroundColor: "#e0e0e0",
                  zIndex: 100,
                  pointerEvents: "none"
                }
              },
              "&.MuiDataGrid-pinnedColumns--right": {
                borderLeft: "1px solid #e0e0e0",
                boxShadow: "0px 3px 5px -1px rgba(0,0,0,0.1), 0px 6px 10px 0px rgba(0,0,0,0.04), 0px 1px 18px 0px rgba(0,0,0,0.02)",
                "&::after": {
                  content: '""',
                  position: "absolute",
                  top: 0,
                  left: 0,
                  bottom: 0,
                  width: "1px",
                  backgroundColor: "#e0e0e0",
                  zIndex: 100,
                  pointerEvents: "none"
                }
              }
            },
            "& .MuiDataGrid-pinnedColumnHeaders": {
              position: "relative",
              zIndex: 50,
              "&.MuiDataGrid-pinnedColumnHeaders--left": {
                borderRight: "1px solid #e0e0e0",
                boxShadow: "0px 3px 5px -1px rgba(0,0,0,0.1), 0px 6px 10px 0px rgba(0,0,0,0.04), 0px 1px 18px 0px rgba(0,0,0,0.02)",
                "&::after": {
                  content: '""',
                  position: "absolute",
                  top: 0,
                  right: 0,
                  bottom: 0,
                  width: "1px",
                  backgroundColor: "#e0e0e0",
                  zIndex: 100,
                  pointerEvents: "none"
                }
              },
              "&.MuiDataGrid-pinnedColumnHeaders--right": {
                borderLeft: "1px solid #e0e0e0",
                boxShadow: "0px 3px 5px -1px rgba(0,0,0,0.1), 0px 6px 10px 0px rgba(0,0,0,0.04), 0px 1px 18px 0px rgba(0,0,0,0.02)",
                "&::after": {
                  content: '""',
                  position: "absolute",
                  top: 0,
                  left: 0,
                  bottom: 0,
                  width: "1px",
                  backgroundColor: "#e0e0e0",
                  zIndex: 100,
                  pointerEvents: "none"
                }
              }
            },
            // Add visible borders to pinned columns with !important to override any inline styles
            ".MuiDataGrid-pinnedColumns--left": {
              borderRight: "1px solid #e0e0e0 !important",
            },
            ".MuiDataGrid-pinnedColumns--right": {
              borderLeft: "1px solid #e0e0e0 !important",
            },
            ".MuiDataGrid-pinnedColumnHeaders--left": {
              borderRight: "1px solid #e0e0e0 !important",
            },
            ".MuiDataGrid-pinnedColumnHeaders--right": {
              borderLeft: "1px solid #e0e0e0 !important",
            },
            // Add pinned border elements that will be absolutely positioned and guaranteed visible
            "& .MuiDataGrid-pinnedColumns, & .MuiDataGrid-pinnedColumnHeaders": {
              position: "relative",
            },
            "& .MuiDataGrid-pinnedColumns--left::after, & .MuiDataGrid-pinnedColumnHeaders--left::after": {
              content: '""',
              position: "absolute",
              top: 0,
              right: 0,
              bottom: 0,
              width: "2px",
              backgroundColor: "#bdbdbd",
              boxShadow: "1px 0 3px rgba(0,0,0,0.1)", 
              zIndex: 9999,
              pointerEvents: "none"
            },
            "& .MuiDataGrid-pinnedColumns--right::before, & .MuiDataGrid-pinnedColumnHeaders--right::before": {
              content: '""',
              position: "absolute",
              top: 0,
              left: 0,
              bottom: 0,
              width: "2px",
              backgroundColor: "#bdbdbd",
              boxShadow: "-1px 0 3px rgba(0,0,0,0.1)",
              zIndex: 9999,
              pointerEvents: "none"
            },
            // Dynamic pinned column dividers with better styling
            "& .MuiDataGrid-pinnedColumns--left::after, & .MuiDataGrid-pinnedColumnHeaders--left::after": {
              content: '""',
              position: "absolute",
              top: 0,
              right: 0,
              height: "calc(100% - 56px)", // Stop before pagination (56px is pagination height)
              width: "1px", // Thinner divider
              backgroundColor: "#bdbdbd",
              boxShadow: "1px 0 2px rgba(0,0,0,0.05)", 
              zIndex: 9999,
              pointerEvents: "none"
            },
            "& .MuiDataGrid-pinnedColumns--right::before, & .MuiDataGrid-pinnedColumnHeaders--right::before": {
              content: '""',
              position: "absolute",
              top: 0,
              left: 0,
              height: "calc(100% - 56px)", // Stop before pagination (56px is pagination height)
              width: "1px", // Thinner divider
              backgroundColor: "#bdbdbd",
              boxShadow: "-1px 0 2px rgba(0,0,0,0.05)",
              zIndex: 9999,
              pointerEvents: "none"
            },
          }}
        />
      </Box>

      {/* Country Detail Modal */}
      <Dialog open={modalOpen} onClose={handleCloseModal} maxWidth="md" fullWidth>
        {selectedCountry && (
          <>
            <DialogTitle>
              {selectedCountry.country} ({selectedCountry.continent})
            </DialogTitle>
            <DialogContent dividers>
              <Box sx={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 2 }}>
                <Typography variant="body1">
                  <strong>Capital:</strong> {selectedCountry.capital}
                </Typography>
                <Typography variant="body1">
                  <strong>Population:</strong> {selectedCountry.population}
                </Typography>
                <Typography variant="body1">
                  <strong>Area:</strong> {selectedCountry.area}
                </Typography>
                <Typography variant="body1">
                  <strong>Government:</strong> {selectedCountry.governmentType}
                </Typography>
                <Typography variant="body1">
                  <strong>Independence:</strong> {selectedCountry.independence}
                </Typography>
                <Typography variant="body1">
                  <strong>GDP:</strong> {selectedCountry.gdpTotal}
                </Typography>
              </Box>
            </DialogContent>
            <DialogActions>
              <Button onClick={handleCloseModal}>Close</Button>
            </DialogActions>
          </>
        )}
      </Dialog>
    </Paper>
  )
}
