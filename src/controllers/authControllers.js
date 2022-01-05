const express = require("express");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const secret = process.env.SECRET;
const bcrypt = require("bcryptjs");

const service = require("../services");

const find = async (req, res, next) => {
  const { email, password } = req.body;
  const user = await service.findUser(email);
  if (!user) {
    res.status(400).json({
      status: "error",
      code: 400,
      message: "Incorrect login or password",
      data: "Bad request",
    });
    next();
    return;
  }

  const checkedPassword = bcrypt.compareSync(password, user.password);
  if (!checkedPassword) {
    res.status(400).json({
      status: "error",
      code: 400,
      message: "Incorrect login or password",
      data: "Bad request",
    });
    next();
    return;
  }

  const payload = {
    id: user.id,
    username: user.username,
    email: user.email,
  };

  const token = jwt.sign(payload, secret);
  await service.updateToken(user.id, token);

  res.json({
    status: "success",
    code: 200,
    data: {
      token,
      user: payload,
    },
  });
};

const create = async (req, res, next) => {
  const { username, email, password } = req.body;
  const user = await service.findUser(email);

  if (user) {
    res.status(409).json({
      status: "error",
      code: 409,
      message: "Email is already in use",
      data: "Conflict",
    });
    next();
    return;
  }
  try {
    await service.createUser(username, email, password);
    res.status(201).json({
      status: "success",
      code: 201,
      data: {
        message: "Registration successful",
      },
    });
  } catch (error) {
    next(error);
  }
};

const logout = async (req, res, next) => {
  const id = req.user.id;
  console.log(req.user);
  try {
    await service.updateToken(id, null);
    res.status(201).json({
      status: "success",
      code: 201,
      data: {
        message: "Logout successful",
      },
    });
  } catch (error) {
    next(error);
  }
};

const getUser = async (req, res, next) => {
  try {
    res.json({
      status: "success",
      code: 200,
      data: {
        user: req.user,
      },
    });
  } catch (error) {
    next(error);
  }
};

const updateSubscription = async (req, res, next) => {
  const id = req.user.id;
  const { subscription } = req.body;
  try {
    await service.updateSubscription(id, subscription);
    res.json({
      status: "success",
      code: 200,
      data: {
        user: req.user,
      },
    });
  } catch (error) {
    next(error);
  }
};

module.exports = { find, create, logout, getUser, updateSubscription };
