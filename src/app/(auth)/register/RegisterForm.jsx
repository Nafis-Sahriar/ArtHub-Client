"use client";
import React, { useState } from 'react';
import { Button, Form, Input, Label, TextField, FieldError, Radio, RadioGroup, Description } from "@heroui/react";
import toast from "react-hot-toast";
import { FcGoogle } from "react-icons/fc";
import Link from "next/link";
import { authClient } from '@/lib/auth-client';
import { redirect } from 'next/navigation';
import { motion } from 'framer-motion';

const RegisterForm = ({ redirectTo = "/" }) => {

    const [password, setPassword] = useState("");

    const onSubmit = async (e) => {
        e.preventDefault();

        const formData = new FormData(e.target);
        const userData = Object.fromEntries(formData.entries());

        const plan = userData.role === 'buyer' ? 'buyer_free' : 'buyer_free';
        userData.plan = plan;

        console.log("Form Data Submitted:", userData);

        const { data, error } = await authClient.signUp.email({
            email: userData.email,
            password: userData.password,
            name: userData.name,
            image: userData.imageUrl,
            role: userData.role || "buyer", 
            plan: userData.plan
        });

        if (data) {
            redirect(redirectTo);
        }
        if (error) {
            toast.error("Error signing UP, something went wrong.");
        }
    };

    const handleGoogleSignUp = async () => {

        const data = await authClient.signIn.social({
            provider: "google",
           
        })

       if(data){
            redirect(redirectTo);
       }
       else{
            toast.error("Error signing UP with Google, something went wrong.");
       }

    };

    // Unified animation presets
    const fadeInUp = {
        hidden: { opacity: 0, y: 24 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
    };

    const cardScaleUp = {
        hidden: { opacity: 0, scale: 0.92, y: 15 },
        visible: (customDelay) => ({
            opacity: 1,
            scale: 1,
            y: 0,
            transition: { delay: customDelay, duration: 0.5, type: "spring", stiffness: 100 }
        })
    };

    return (
        <div>
            <section className="relative min-h-screen overflow-hidden bg-[#11140E] text-white">

                {/* Glowing Accent Shapes */}
                <motion.div 
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 1.5, ease: "easeOut" }}
                    className="absolute left-1/2 top-0 h-125 w-125 -translate-x-1/2 rounded-full bg-[#718355]/20 blur-[180px]" 
                />
                <motion.div 
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 1.8, delay: 0.2, ease: "easeOut" }}
                    className="absolute bottom-0 right-0 h-87.5 w-87.5 rounded-full bg-[#CFE1B9]/10 blur-[140px]" 
                />

                <div className="relative z-10 mx-auto flex min-h-screen w-[90%] items-center py-12">
                    <div className="grid w-full items-center gap-16 lg:grid-cols-2">

                        {/* Left Section -- Animated Content */}
                        <div className="hidden lg:block">
                            <motion.div 
                                initial="hidden"
                                animate="visible"
                                variants={{
                                    visible: { transition: { staggerChildren: 0.15 } }
                                }}
                                className="max-w-xl"
                            >
                                <motion.h1 variants={fadeInUp} className="bg-linear-to-r from-[#CFE1B9] via-[#97A97C] to-[#718355] bg-clip-text text-5xl font-bold text-transparent">
                                 ArtHub
                                </motion.h1>

                                <motion.h2 variants={fadeInUp} className="mt-8 text-6xl font-bold leading-tight">
                                    Get the Desired Artworks
                                    <br />
                                    You&apos;ve Always Wanted
                                </motion.h2>

                                <motion.p variants={fadeInUp} className="mt-8 text-lg leading-8 text-gray-400">
                                    Join ArtHub today and unlock a world of creativity at your fingertips.
                                </motion.p>

                                <div className="mt-14 grid grid-cols-3 gap-6">
                                    <motion.div 
                                        custom={0.4} initial="hidden" animate="visible" variants={cardScaleUp}
                                        className="rounded-3xl border border-[#CFE1B9]/10 bg-white/5 p-6 backdrop-blur-xl"
                                    >
                                        <h3 className="text-3xl font-bold text-[#CFE1B9]">50K+</h3>
                                        <p className="mt-2 text-sm text-gray-400">Artworks Available</p>
                                    </motion.div>

                                    <motion.div 
                                        custom={0.5} initial="hidden" animate="visible" variants={cardScaleUp}
                                        className="rounded-3xl border border-[#CFE1B9]/10 bg-white/5 p-6 backdrop-blur-xl"
                                    >
                                        <h3 className="text-3xl font-bold text-[#CFE1B9]">100+</h3>
                                        <p className="mt-2 text-sm text-gray-400">Artists</p>
                                    </motion.div>

                                    <motion.div 
                                        custom={0.6} initial="hidden" animate="visible" variants={cardScaleUp}
                                        className="rounded-3xl border border-[#CFE1B9]/10 bg-white/5 p-6 backdrop-blur-xl"
                                    >
                                        <h3 className="text-3xl font-bold text-[#CFE1B9]">99%</h3>
                                        <p className="mt-2 text-sm text-gray-400">Satisfaction</p>
                                    </motion.div>
                                </div>
                            </motion.div>
                        </div>

                        {/* Right Section -- Card Entry */}
                        <div className="mx-auto w-full max-w-lg">
                            <motion.div 
                                initial={{ opacity: 0, y: 30, scale: 0.98 }}
                                animate={{ opacity: 1, y: 0, scale: 1 }}
                                transition={{ duration: 0.7, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
                                className="rounded-[32px] border border-[#CFE1B9]/10 bg-white/5 p-8 backdrop-blur-xl md:p-10"
                            >
                                <div className="mb-8 text-center lg:hidden">
                                    <h1 className="bg-linear-to-r from-[#CFE1B9] via-[#97A97C] to-[#718355] bg-clip-text text-4xl font-bold text-transparent">
                                        ArtHub
                                    </h1>
                                </div>

                                <div className="text-center">
                                    <h2 className="text-3xl font-bold">
                                        Create Account
                                    </h2>
                                    <p className="mt-3 text-gray-400">
                                        Join ArtHub today and unlock a world of creativity at your fingertips.
                                    </p>
                                </div>

                                <Form className="mx-auto mt-8 flex w-full flex-col gap-5" onSubmit={onSubmit}>
                                    <TextField isRequired name="name" type="text">
                                        <Label className="text-gray-300 font-semibold mb-2">Name</Label>
                                        <Input placeholder="John Doe" className="text-black" />
                                        <FieldError />
                                    </TextField>

                                    <TextField
                                        isRequired
                                        name="email"
                                        type="email"
                                        validate={(value) => {
                                            if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(value)) {
                                                return "Please enter a valid email address";
                                            }
                                            return null;
                                        }}
                                    >
                                        <Label className="text-gray-300 font-semibold mb-2">Email</Label>
                                        <Input placeholder="yourname@example.com" className="text-black" />
                                        <FieldError />
                                    </TextField>

                                    <TextField name="imageUrl" type="text">
                                        <Label className="text-gray-300 font-semibold mb-2">Image URL</Label>
                                        <Input placeholder="https://example.com/image.jpg" className="text-black" />
                                        <FieldError />
                                    </TextField>

                                    <TextField
                                        isRequired
                                        name="password"
                                        type="password"
                                        validate={(value) => {
                                            if (value.length < 6) return "Password must be at least 6 characters";
                                            if (!/[A-Z]/.test(value)) return "Password must contain at least one uppercase letter";
                                            if (!/[a-z]/.test(value)) return "Password must contain at least one lowercase letter";
                                            return null;
                                        }}
                                    >
                                        <Label className="text-gray-300 font-semibold mb-2">Password</Label>
                                        <Input
                                            placeholder="Enter your password"
                                            onChange={(e) => setPassword(e.target.value)}
                                            className="text-black"
                                        />
                                        <FieldError />
                                    </TextField>

                                    <TextField
                                        isRequired
                                        name="confirmPassword"
                                        type="password"
                                        validate={(value) => {
                                            if (value !== password) return "Passwords do not match";
                                            return null;
                                        }}
                                    >
                                        <Label className="text-gray-300 font-semibold mb-2">Confirm Password</Label>
                                        <Input placeholder="Confirm your password" className="text-black" />
                                        <FieldError />
                                    </TextField>

                                    {/* FIXED: Using the latest HeroUI nested syntax for Radio elements */}
                                    <div className="flex flex-col gap-4">
                                        <Label className="text-gray-300 font-semibold">Select Role</Label>
                                        <RadioGroup defaultValue="buyer" name="role" orientation="horizontal" className="gap-4">
                                            
                                            <Radio value="buyer" className="group">
                                                <Radio.Content className="flex items-center gap-2">
                                                    <Radio.Control>
                                                        <Radio.Indicator className="bg-[#718355]" />
                                                    </Radio.Control>
                                                    <span className="text-white font-medium">Artwork Enthusiast</span>
                                                </Radio.Content>
                                                <Description className="text-gray-400 text-xs ml-6">
                                                    Basic access to explore art
                                                </Description>
                                            </Radio>

                                            <Radio value="artist" className="group">
                                                <Radio.Content className="flex items-center gap-2">
                                                    <Radio.Control>
                                                        <Radio.Indicator className="bg-[#718355]" />
                                                    </Radio.Control>
                                                    <span className="text-white font-medium">Artist</span>
                                                </Radio.Content>
                                                <Description className="text-gray-400 text-xs ml-6">
                                                    Post art and view sales
                                                </Description>
                                            </Radio>

                                        </RadioGroup>
                                    </div>

                                    <div className="flex gap-2 my-4">
                                        <Button
                                            type="submit"
                                            className="w-full rounded-xl bg-[#718355] py-6 font-semibold text-white transition-all duration-300 hover:bg-[#87986A]"
                                        >
                                            Sign Up
                                        </Button>
                                    </div>

                                    <hr className="border-[#CFE1B9]/10" />

                                    <div>
                                        <p className="text-center text-[#dcdad6] text-sm">
                                            Or continue with
                                        </p>

                                        <div className="flex gap-4 justify-center mt-4">
                                            <Button
                                                variant="bordered"
                                                className="w-full border-[#CFE1B9]/10 bg-white/5 text-white transition-all duration-300 hover:bg-white/10"
                                                onClick={handleGoogleSignUp}
                                            >
                                                Google <FcGoogle className="ml-2" />
                                            </Button>
                                        </div>
                                    </div>
                                </Form>

                                <p className="mt-8 text-center text-sm text-gray-400">
                                    Already have an account?{" "}
                                    <Link
                                        href={`/login?redirect=${redirectTo}`}
                                        className="font-medium text-[#97A97C] transition-colors duration-300 hover:text-[#CFE1B9]"
                                    >
                                        Sign In
                                    </Link>
                                </p>

                                <p className="mt-6 text-center text-xs leading-6 text-gray-500">
                                    By creating an account, you agree to our Terms of Service and Privacy Policy.
                                </p>
                            </motion.div>
                        </div>

                    </div>
                </div>
            </section>
        </div>
    );
};

export default RegisterForm;