// Data types for API response
interface Person {
  id: number
  firstname: string
  lastname: string
  email: string
  phone: string
  birthday: string
  gender: string
  address: {
    country: string
    country_code: string
    city: string
  }
  website: string
}

interface ApiResponse {
  status: string
  code: number
  total: number
  data: Person[]
}

interface PersonWithCalculations extends Person {
  age: number
  continent: string
}

// Statistics interface
interface Statistics {
  byAge: Record<number, number>
  byContinent: Record<string, number>
  byGender: Record<string, number>
  byAgeGenderContinent: Record<string, number>
}

// Country code to continent mapping
const countryToContinent: Record<string, string> = {
  // North America
  US: "North America",
  CA: "North America",
  MX: "North America",
  GT: "North America",
  BZ: "North America",
  SV: "North America",
  HN: "North America",
  NI: "North America",
  CR: "North America",
  PA: "North America",

  // South America
  BR: "South America",
  AR: "South America",
  CL: "South America",
  PE: "South America",
  CO: "South America",
  VE: "South America",
  EC: "South America",
  UY: "South America",
  PY: "South America",
  BO: "South America",
  GY: "South America",
  SR: "South America",
  GF: "South America",

  // Europe
  GB: "Europe",
  FR: "Europe",
  DE: "Europe",
  IT: "Europe",
  ES: "Europe",
  NL: "Europe",
  BE: "Europe",
  CH: "Europe",
  AT: "Europe",
  SE: "Europe",
  NO: "Europe",
  DK: "Europe",
  FI: "Europe",
  PL: "Europe",
  CZ: "Europe",
  HU: "Europe",
  RO: "Europe",
  HR: "Europe",
  SI: "Europe",
  SK: "Europe",
  LV: "Europe",
  EE: "Europe",
  IE: "Europe",
  PT: "Europe",
  GR: "Europe",
  CY: "Europe",
  MT: "Europe",
  LU: "Europe",
  RU: "Europe",
  TR: "Europe",
  UA: "Europe",
  BY: "Europe",
  MD: "Europe",
  LT: "Europe",
  BG: "Europe",

  // Asia
  CN: "Asia",
  JP: "Asia",
  KR: "Asia",
  IN: "Asia",
  TH: "Asia",
  VN: "Asia",
  PH: "Asia",
  ID: "Asia",
  MY: "Asia",
  SG: "Asia",
  TW: "Asia",
  HK: "Asia",
  MO: "Asia",
  IL: "Asia",
  AE: "Asia",
  SA: "Asia",
  QA: "Asia",
  KW: "Asia",
  BH: "Asia",
  OM: "Asia",
  JO: "Asia",
  LB: "Asia",
  SY: "Asia",
  IQ: "Asia",
  IR: "Asia",
  AF: "Asia",
  PK: "Asia",
  BD: "Asia",
  LK: "Asia",
  MM: "Asia",
  KH: "Asia",
  LA: "Asia",
  MN: "Asia",
  KZ: "Asia",
  UZ: "Asia",
  TM: "Asia",
  KG: "Asia",
  TJ: "Asia",

  // Africa
  ZA: "Africa",
  EG: "Africa",
  NG: "Africa",
  KE: "Africa",
  MA: "Africa",
  TN: "Africa",
  GH: "Africa",
  ET: "Africa",
  UG: "Africa",
  TZ: "Africa",
  DZ: "Africa",
  AO: "Africa",
  MZ: "Africa",
  MG: "Africa",
  CM: "Africa",
  CI: "Africa",
  NE: "Africa",
  BF: "Africa",
  ML: "Africa",
  MW: "Africa",
  ZM: "Africa",
  SN: "Africa",
  SO: "Africa",
  TD: "Africa",
  SL: "Africa",
  TG: "Africa",
  CF: "Africa",
  LR: "Africa",
  MR: "Africa",
  NA: "Africa",
  BW: "Africa",
  GA: "Africa",

  // Oceania
  AU: "Oceania",
  NZ: "Oceania",
  FJ: "Oceania",
  PG: "Oceania",
  SB: "Oceania",
  VU: "Oceania",
  NC: "Oceania",
  PF: "Oceania",
}

// Step 1: Fetch data from API with specific criteria
async function fetchPersonsData(): Promise<Person[]> {
  const seed = "IbtissamLaalaoui"
  const startDate = "2005-01-01"
  const endDate = "2009-12-31"
  const quantity = 50
  const url = `https://fakerapi.it/api/v1/persons?_seed=${seed}&_start_date=${startDate}&_end_date=${endDate}&_quantity=${quantity}`

  console.log("STEP 1: Fetching data with specific criteria")
  console.log(`   - Seed: ${seed}`)
  console.log(`   - Date range: ${startDate} to ${endDate}`)
  console.log(`   - Quantity: ${quantity}`)

  try {
    const response = await fetch(url)

    if (!response.ok) {
      throw new Error(`HTTP error: ${response.status}`)
    }

    const data: ApiResponse = await response.json()
    console.log(`Successfully fetched ${data.total} records`)

    return data.data
  } catch (error) {
    console.error("Error fetching data:", error)
    throw error
  }
}

// Step 2: Filter by websites ending in .com
function filterByComWebsites(persons: Person[]): Person[] {
  console.log("\nSTEP 2: Filtering by .com websites")
  console.log(`Records before filtering: ${persons.length}`)

  const filtered = persons.filter((person) => {
    return person.website.endsWith(".com")
  })

  console.log(`Records after filtering: ${filtered.length}`)
  console.log(`Records removed: ${persons.length - filtered.length}`)

  return filtered
}

// Step 3: Calculate age and continent for each person
function calculateAgeAndContinent(persons: Person[]): PersonWithCalculations[] {
  console.log("\nSTEP 3: Calculating age and continent")

  const currentYear = new Date().getFullYear()

  const enrichedPersons = persons.map((person) => {
    // Calculate age
    const birthYear = new Date(person.birthday).getFullYear()
    const age = currentYear - birthYear

    // Determine continent
    const countryCode = person.address.country_code
    const continent = countryToContinent[countryCode] || "Unknown"

    return {
      ...person,
      age: age,
      continent: continent,
    }
  })

  console.log(`Calculations completed for ${enrichedPersons.length} persons`)

  // Show some examples
  console.log("\nCalculation examples:")
  enrichedPersons.slice(0, 3).forEach((person, index) => {
    console.log(`   ${index + 1}. ${person.firstname} ${person.lastname}:`)
    console.log(`      Age: ${person.age} years`)
    console.log(`      Country: ${person.address.country} (${person.address.country_code})`)
    console.log(`      Continent: ${person.continent}`)
  })

  return enrichedPersons
}

// Step 4: Generate statistics
function generateStatistics(persons: PersonWithCalculations[]): Statistics {
  console.log("\nSTEP 4: Generating statistics")

  const stats: Statistics = {
    byAge: {},
    byContinent: {},
    byGender: {},
    byAgeGenderContinent: {},
  }

  persons.forEach((person) => {
    // Count by age
    stats.byAge[person.age] = (stats.byAge[person.age] || 0) + 1

    // Count by continent
    stats.byContinent[person.continent] = (stats.byContinent[person.continent] || 0) + 1

    // Count by gender
    stats.byGender[person.gender] = (stats.byGender[person.gender] || 0) + 1

    // Count by age-gender-continent combination
    const key = `${person.age}-${person.gender}-${person.continent}`
    stats.byAgeGenderContinent[key] = (stats.byAgeGenderContinent[key] || 0) + 1
  })

  console.log("Statistics generated successfully")
  return stats
}

// Step 5: Present analysis summary
function presentSummary(persons: PersonWithCalculations[], stats: Statistics): void {
  console.log("\n" + "=".repeat(60))
  console.log("STEP 5: FINAL ANALYSIS SUMMARY")
  console.log("=".repeat(60))

  console.log(`\nTotal persons processed: ${persons.length}`)

  // Age distribution
  console.log("\nDISTRIBUTION BY AGE:")
  Object.entries(stats.byAge)
    .sort(([a], [b]) => Number(a) - Number(b))
    .forEach(([age, count]) => {
      console.log(`   ${age} years: ${count} persons`)
    })

  // Continent distribution
  console.log("\nDISTRIBUTION BY CONTINENT:")
  Object.entries(stats.byContinent)
    .sort(([, a], [, b]) => (b as number) - (a as number))
    .forEach(([continent, count]) => {
      console.log(`   ${continent}: ${count} persons`)
    })

  // Gender distribution
  console.log("\nDISTRIBUTION BY GENDER:")
  Object.entries(stats.byGender).forEach(([gender, count]) => {
    console.log(`   ${gender}: ${count} persons`)
  })

  // Top 10 age-gender-continent combinations
  console.log("\nTOP 10 AGE-GENDER-CONTINENT COMBINATIONS:")
  Object.entries(stats.byAgeGenderContinent)
    .sort(([, a], [, b]) => (b as number) - (a as number))
    .slice(0, 10)
    .forEach(([combination, count], index) => {
      const [age, gender, continent] = combination.split("-")
      console.log(`   ${index + 1}. ${age} years, ${gender}, ${continent}: ${count} persons`)
    })

  // Sample of processed records
  console.log("\nSAMPLE OF PROCESSED RECORDS:")
  persons.slice(0, 5).forEach((person, index) => {
    console.log(`\n   ${index + 1}. ${person.firstname} ${person.lastname}`)
    console.log(`      Email: ${person.email}`)
    console.log(`      Website: ${person.website}`)
    console.log(`      Phone: ${person.phone}`)
    console.log(`      Age: ${person.age} years`)
    console.log(`      Location: ${person.address.city}, ${person.address.country}`)
    console.log(`      Continent: ${person.continent}`)
    console.log(`      Gender: ${person.gender}`)
  })

  console.log("\n" + "=".repeat(60))
  console.log("ANALYSIS COMPLETED SUCCESSFULLY")
  console.log("All technical test requirements have been fulfilled:")
  console.log("   1. Data obtained from public API")
  console.log("   2. Filtered by .com websites")
  console.log("   3. Transformation: age and continent calculation")
  console.log("   4. Statistics by age, continent, gender and combinations")
  console.log("   5. Complete presentation in console")
  console.log("=".repeat(60))
}

// Main function
async function main(): Promise<void> {
  try {
    console.log("Starting data analysis")

    // Step 1: Fetch data
    const persons = await fetchPersonsData()

    // Step 2: Filter by .com websites
    const filteredPersons = filterByComWebsites(persons)

    // Step 3: Calculate age and continent
    const enrichedPersons = calculateAgeAndContinent(filteredPersons)

    // Step 4: Generate statistics
    const statistics = generateStatistics(enrichedPersons)

    // Step 5: Present summary
    presentSummary(enrichedPersons, statistics)
  } catch (error) {
    console.error("Fatal error:", error)
    process.exit(1)
  }
}

// Execute the script
main()