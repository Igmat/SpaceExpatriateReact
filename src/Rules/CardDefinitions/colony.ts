import { ColonyCard } from "../card-types";
import { createCards } from "./createCards";

export const colonyCards = createCards<ColonyCard>(

    "colony",

    // -------------- Delivery ----------------
    {
        benefit: "On Delivery ignores all fuel in Space Garbage",
        whenIsActivated: "before",
        mutateAction: "delivery",
        players: 3,
        name: "PLUTONIUM ORE MINES"
    },
    {
        benefit: "On Delivery ignores all minerals in Space Garbage",
        whenIsActivated: "before",
        mutateAction: "delivery",
        players: 3,
        name: "TITANIUM MINES"
    },
    {
        benefit: "On Delivery ignores all biotic/machinery materials in Space Garbage",
        whenIsActivated: "during",
        mutateAction: "delivery",
        players: 3,
        name: "MANUFACTURING MEGAPOLIS"
    },
    {
        benefit: "On Delivery one of your Delivery Station Modules ignores Space Garbage",
        whenIsActivated: "during",
        mutateAction: "delivery",
        players: 2,
        name: "BLACK MARKET"
    },
    {
        benefit: "Before Delivery add/remove a resource to/from Space Garbage. You may do this as many times as there are players in the game",
        whenIsActivated: "before",
        mutateAction: "delivery",
        name: "SPACE LIFT"
    },

    // -------------- Engineering ----------------
    {
        benefit: "Before Engineering dock a Station Module from Delivery supply",
        whenIsActivated: "before",
        mutateAction: "engineering",
        players: 3,
        name: "SPACE CARRIERS PORT"
    },
    {
        benefit: "Before Engineering dock a Station Module from Engineering supply",
        whenIsActivated: "before",
        mutateAction: "engineering",
        players: 3,
        name: "ROBOTICS ASSERMBLY PLANT"
    },
    {
        benefit: "Before Engineering dock a Station Module from Terraforming supply",
        whenIsActivated: "before",
        mutateAction: "engineering",
        players: 3,
        name: "SCIENTIFIC INDUSTRIES"
    },
    {
        benefit: "Before Engineering dock a Station Module from Military supply",
        whenIsActivated: "before",
        mutateAction: "engineering",
        players: 3,
        name: "MILITARY ENGINEERING"
    },
    {
        benefit: "After Engineering dock a Station Module(from supply) of any type of which you have fewer on your Station than the other types",
        whenIsActivated: "after",
        mutateAction: "engineering",
        players: 2,
        name: "SPACECRAFT MANUFACTORY"
    },
    {
        benefit: "On Engineering gain 1 point for each Station Module being docked to your Station during the Action",
        whenIsActivated: "during",
        mutateAction: "engineering",
        name: "SPACE INDUSTRY CENTER"
    },
    {
        benefit: "{connection: 'end',  exitPoint: ['fuel', 'biotic material', 'minerals'], points: 2, name: 'HELIOSTAT DESERT'}",
        //Добавляется новый модуль в инженерию
        whenIsActivated: "before",
        mutateAction: "engineering",
        name: "HELIOSTAT DESERT",
    },

    // -------------- Military ----------------
    {
        benefit: "Empowers Spaceborne Forces, and wins the tie when comparing military power for this Combat Arms forces",
        whenIsActivated: "during",
        mutateAction: "military",
        players: 3,
        name: "INFANTRY TRAINING CAMP",
    },
    {
        benefit: "Empowers Extraterrestrial Fighters and wins the tie when comparing military power for this Combat Arms forces",
        whenIsActivated: "during",
        mutateAction: "military",
        players: 3,
        name: "MILITARY COSMODROME",
    },
    {
        benefit: "Empowers Intelligence Assessment and wins the tie when comparing military power for this Combat Arms forces",
        whenIsActivated: "during",
        mutateAction: "military",
        players: 3,
        name: "HYPERTELESCOPES",
    },
    {
        benefit: "Empowers Orbital Forces and wins the tie when comparing military power for this Combat Arms forces",
        whenIsActivated: "during",
        mutateAction: "military",
        players: 3,
        name: "MISSILE GUIDANCE",
    },
    {
        benefit: "Tactical Nanorobotics", //Добавляется новый модуль в милитари
        whenIsActivated: "during",
        mutateAction: "military",
        players: 2,
        name: "TACTICAL NANOROBOTICS",
    },
    {
        benefit: "On Military gain 1 point for each card drawn by you during the Action, but not more than 3 points",
        whenIsActivated: "during",
        mutateAction: "military",
        name: "COMMAND CENTER",
    },
    {
        benefit: "On Military (Political Pressure) when docking another player's Station Module, draw a card for each of their Inferiorities",
        whenIsActivated: "during",
        mutateAction: "military",
        name: "REVERSE ENGINEERING LAB",
    },

    // -------------- Terraforming ----------------
    {
        benefit: "On Terraforming gain 2 points if the Mission Type is not Delivery",
        whenIsActivated: "during",
        mutateAction: "terraforming",
        players: 3,
        name: "DETACHED DEVELOPMENT CENTER",
    },
    {
        benefit: "On Terraforming gain 2 points if the Mission Type is not Engineering",
        whenIsActivated: "during",
        mutateAction: "terraforming",
        players: 3,
        name: "EXTENSIVE GROWTH EXPERTISE",
    },
    {
        benefit: "On Terraforming gain 2 points if the Mission Type is not Terraforming",
        whenIsActivated: "during",
        mutateAction: "terraforming",
        players: 3,
        name: "OUTER SPACE AFFAIRS AGENCY",
    },
    {
        benefit: "On Terraforming gain 2 points if the Mission Type is not Military",
        whenIsActivated: "during",
        mutateAction: "terraforming",
        players: 3,
        name: "SCIENTIFIC COMMITTEE",
    },
    {
        benefit: "On Terraforming gain 2 points if you have at least 1 Station Module card of the mission Type in your Hand",
        whenIsActivated: "during",
        mutateAction: "terraforming",
        players: 2,
        name: "OPERATIONS SUPPORT COMMAND",
    },
    {
        benefit: "After Terraforming dock a Station Module of the Mission Type from supply",
        whenIsActivated: "after",
        mutateAction: "terraforming",
        name: "STRATEGIC DEVELOPMENT CENTER",
    },
    {
        benefit: "On Terraforming on your turn collect all points from neutral Colonies (even if you do not set up a Colony)",
        whenIsActivated: "during",
        mutateAction: "terraforming",
        name: "FIELD RESEARCH HEADQUARTERS",
    },
)

