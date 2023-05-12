const express = require("express");
const cors = require("cors");
const { adminRoutes } = require("./routes/admin.routes");
const { userRoutes } = require("./routes/user.routes");
const { connection } = require("./configs/db");
const { verifyToken } = require("./middlewares/auth.middleware");
require("dotenv").config();

const app = express();
app.use(express.json());
app.use(cors());
app.get("/",(req,res)=>{res.send("Homepage")})
app.use("/users", userRoutes);
app.use("/admins", adminRoutes);
app.use(verifyToken);

app.listen(process.env.port, async () => {
    try {
        await connection;
        console.log("Database connection established");
    } catch (e) {console.log(e.message)}
    console.log(`Server is live at port ${process.env.port}`);
})