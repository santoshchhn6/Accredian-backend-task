import express from "express";
const router = express.Router();
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

router.post("/add", async (req, res) => {
  const {
    referee_name,
    referee_email,
    referee_phone,
    referrer_name,
    referrer_email,
    referrer_phone,
    relationship,
  } = req.body;
  try {
    let referrer = await prisma.user.findUnique({
      where: {
        email: referrer_email,
      },
    });
    let referee = await prisma.user.findUnique({
      where: {
        email: referee_email,
      },
    });

    if (!referrer) {
      referrer = await prisma.user.create({
        data: {
          name: referrer_name,
          email: referrer_email,
          phone: referrer_phone,
        },
      });
    }
    if (!referee) {
      referee = await prisma.user.create({
        data: {
          name: referee_name,
          email: referee_email,
          phone: referee_phone,
        },
      });
    }

    const referal = await prisma.referal.findFirst({
      where: {
        refereeId: referee.id,
        referrerId: referrer.id,
      },
    });

    if (!referal) {
      await prisma.referal.create({
        data: {
          refereeId: referee.id,
          referrerId: referrer.id,
          relationship,
        },
      });
    }

    res.status(200).json({
      message: "Referral submited successfully",
      success: true,
    });
  } catch (error) {
    console.error(error);
    res.json({ success: false, message: "Server Internal error" });
  }
});

export default router;
