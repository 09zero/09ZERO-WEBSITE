
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 5050;

// =====================================================
// MIDDLEWARE
// =====================================================

app.use(cors());
app.use(express.json());

// =====================================================
// MONGODB SCHEMA
// =====================================================

const enquirySchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true
        },

        company: {
            type: String,
            default: ""
        },

        email: {
            type: String,
            required: true
        },

        phone: {
            type: String,
            default: ""
        },

        service: {
            type: String,
            required: true
        },

        budget: {
            type: String,
            default: ""
        },

        message: {
            type: String,
            required: true
        }
    },
    {
        timestamps: true
    }
);

const Enquiry = mongoose.model("Enquiry", enquirySchema);

// =====================================================
// HOME / BACKEND TEST
// =====================================================

app.get("/", (req, res) => {

    res.json({
        success: true,
        message: "09ZERO Backend is running 🚀"
    });

});

// =====================================================
// CONNECT FORM API
// =====================================================

app.post("/api/connect", async (req, res) => {

    try {

        const {
            name,
            company,
            email,
            phone,
            service,
            budget,
            message
        } = req.body;

        if (!name || !email || !service || !message) {

            return res.status(400).json({
                success: false,
                message: "Please fill all required fields."
            });

        }

        const enquiry = await Enquiry.create({
            name,
            company,
            email,
            phone,
            service,
            budget,
            message
        });

        console.log("");
        console.log("========== NEW 09ZERO ENQUIRY ==========");
        console.log("MongoDB ID:", enquiry._id);
        console.log("Name:", name);
        console.log("Company:", company);
        console.log("Email:", email);
        console.log("Phone:", phone);
        console.log("Service:", service);
        console.log("Budget:", budget);
        console.log("Message:", message);
        console.log("=========================================");
        console.log("");

        res.json({
            success: true,
            message: "Enquiry saved successfully 🚀"
        });

    } catch (error) {

        console.error("MongoDB Error:", error);

        res.status(500).json({
            success: false,
            message: "Unable to save enquiry."
        });

    }

});

// =====================================================
// MONGODB CONNECTION + SERVER START
// =====================================================

mongoose
    .connect(process.env.MONGODB_URI)
    .then(() => {

        console.log("MongoDB connected successfully 🚀");

        app.listen(PORT, () => {

            console.log(
                `09ZERO Backend running on http://localhost:${PORT}`
            );

        });

    })
    .catch((error) => {

        console.error(
            "MongoDB connection failed:",
            error.message
        );

    });