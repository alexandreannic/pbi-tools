import {generatePivotAndFormat} from './generatePivotAndFormat'

console.error(generatePivotAndFormat({
  columns: [
    `18.1.2. What are the factors that make this location feel unsafe?/Armed conflict`,
    `18.1.2. What are the factors that make this location feel unsafe?/Presence of armed actors and/or military`,
    `18.1.2. What are the factors that make this location feel unsafe?/Shelling or threat of shelling`,
    `18.1.2. What are the factors that make this location feel unsafe?/Eviction or threat of eviction`,
    `18.1.2. What are the factors that make this location feel unsafe?/Crime`,
    `18.1.2. What are the factors that make this location feel unsafe?/Tensions with the host community`,
    `18.1.2. What are the factors that make this location feel unsafe?/Threat of GBV, including sexual harrassment and/or exploitation`,
    `18.1.2. What are the factors that make this location feel unsafe?/Presence of hazards, including UXOs`,
    `18.1.2. What are the factors that make this location feel unsafe?/Unsafe or poor living conditions`,
    `18.1.2. What are the factors that make this location feel unsafe?/Don't know`,
    `18.1.2. What are the factors that make this location feel unsafe?/Don't want to say`,
    `18.1.2. What are the factors that make this location feel unsafe?/Other (specify)`,
  ],
  question: '18.1.2. What are the factors that make this location feel unsafe?'
}))
