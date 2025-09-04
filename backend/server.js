const express = require("express");
const cors = require("cors");
const { PrismaClient } = require("@prisma/client");
const { z } = require("zod");

const jwt = require("jsonwebtoken");

const bcrypt = require("bcryptjs");
const SALT_ROUNDS = 10;
const {
  validateBody,
  valdateParams,
} = require("./middleware/validationMiddleware");
const {
  registerSchema,
  loginSchema,
  addEntrySchema,
  entryParamsSchema,
} = require("./schemas/validationSchemas");
const verifyToken = require("./middleware/verifyToken");

const app = express();
const prisma = new PrismaClient();
const port = 4000;

app.use(cors());
app.use(express.json());

app.get("/content", require("./middleware/verifyToken"), (req, res) => {
  // Return a simple confirmation if token is valid
  res.json({ content: "You are logged in!" });
});

/* POST /register */
app.post("/register", validateBody(registerSchema), async (req, res) => {
  const { fullName, email, password, passwordRepeat } = req.body;

  if (!email || !password || !fullName || !passwordRepeat) {
    res
      .status(400)
      .send({ error: "Please fill in all the fields before registering!" });
    return;
  }

  if (password !== passwordRepeat) {
    res.status(400).send({ error: "Passwords do not match!" });
    return;
  }

  try {
    const existingUser = await prisma.user.findUnique({ where: { email } });
    if (existingUser) {
      res.status(409).send({ error: "User already exists." });
      return;
    }

    const hashedPassword = bcrypt.hashSync(password, SALT_ROUNDS);

    const user = await prisma.user.create({
      data: {
        email: email,
        password: hashedPassword,
        fullName: fullName,
      },
    });
    res.status(201).send({
      success: "Your account has been created with " + email,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({ error: "Something went wrong! Try again later." });
    return;
  }
});

/* POST /login */
app.post("/login", validateBody(loginSchema), async (req, res) => {
  const loginData = req.body;

  if (!loginData.email || !loginData.password) {
    res.status(400).send({ error: "You've left empty fields!" });
    return;
  }

  const user = await prisma.user.findUnique({
    where: { email: loginData.email },
  });

  if (!user) {
    res
      .status(401)
      .json({ error: "An account with that email does not exist." });
    return;
  }

  const valid = await bcrypt.compare(loginData.password, user.password);

  if (!valid) {
    res.status(401).json({ error: "Your password is invalid." });
    return;
  }

  const { password, ...safeUser } = user;
  res.send({
    token: jwt.sign({ userId: user.id }, process.env.SECRET_KEY, {
      expiresIn: "1h",
    }),
    user: safeUser,
  });
});

/* GET /messages */
app.get("/", (req, res) => {
  const greeting = "Tjobing";
  res.send({ greeting: greeting });
});

/* POST /messages */
app.post("/add-entry", verifyToken, validateBody(addEntrySchema), async (req, res) => {
  try {
    const { title, content } = req.body;
    const authorId = req.userId; // hent frå verifyToken

    const entry = await prisma.post.create({
      data: { title, content, authorId },
    });

    res.status(201).json(entry);
  } catch (error) {
    res.status(500).json({ error: "Failed to add entry." });
  }
});

app.get('/entries', async (req, res) => {
  try {
    const entries = await prisma.post.findMany({
      include: { author: { select: { fullName: true, email: true } } },
      orderBy: { id: "desc" },
    });
    res.json(entries);
  } catch (error) {
    res.status(500).json({ error: "Could not fetch entries." });
  }
});

app.get("/users", async (req, res) => {
  try {
    const users = await prisma.user.findMany({
      select: {
        id: true,
        email: true,
        fullName: true,
      },
    });
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: "Could not fetch users." });
  }
});

/* Listen */
app.listen(port, () => {
  console.log("Server is running on port ", port);
});
