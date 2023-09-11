import { EngineeringCard } from "../card-types";
import { createCards } from "./createCards";

export const engineeringCards = createCards<EngineeringCard>(
    "engineering",
    { connection: "continue", exitPoint: ["fuel"], name: "REMOTE CONTROL PUMPJACK", quantity: 2 },
    { connection: "continue", exitPoint: ["minerals"], name: "MINING ROBOTS", quantity: 2 },
    { connection: "continue", exitPoint: ["biotic materials"], name: "BIOTIC MATERIALS LAB", quantity: 2 },
    { connection: "continue", entryPoint: "fuel", exitPoint: ["machinery", "nanotechnologies"], name: "SPECIALIZED SPACE FACTORY", quantity: 2 },
    { connection: "continue", entryPoint: "minerals", exitPoint: ["machinery", "nanotechnologies"], name: "ADDITIVE MANUFACTURING HUB", quantity: 2 },
    { connection: "continue", entryPoint: "biotic materials", exitPoint: ["machinery", "nanotechnologies"], name: "BIOROBOTICS ORBITAL FARM", quantity: 2 },
    { connection: "continue", entryPoint: "machinery", exitPoint: ["dark matter"], points: 2, name: "EXPERIMENTAL ROBOTIC LAB", quantity: 2 },
    { connection: "continue", entryPoint:  "nanotechnologies", exitPoint: ["dark matter"], points: 2, name: "EXPERIMENTAL NANOTECHNOLOGY LAB", quantity: 2},
    { connection: "end", exitPoint: ["fuel" , "minerals"], name: "FOSSIL MINING UNIT", quantity: 2},
    { connection: "end", exitPoint: ["fuel", "biotic materials"], name: "BIODIVERSITY RESEARCH LAB", quantity: 2 },
    { connection: "end", exitPoint: ["minerals", "biotic materials"], name: "CIENTIFIC SPACE LAB", quantity: 2 },
    { connection: "end", exitPoint: ["machinery"], name: "EXTRATERRESTRIAL MACHINERY PLANT", quantity: 2 },  
    { connection: "end", exitPoint: ["nanotechnologies"], name: "NANOMANUFACTURING FACILITY", quantity: 2 },
    { connection: "start", entryPoint: "fuel", points: 1, name: "FOSSIL-FUEL POWER STATION", quantity: 2 },
    { connection: "start", entryPoint: "minerals", points: 1, name: "NUCLEAR POWER PLANT", quantity: 2 },
    { connection: "start", entryPoint: "biotic materials", points: 1, name: "BIOMASS-FUEL POWER STATION", quantity: 2 },
)

