"use client";
import React, { useState } from 'react';
import Link from 'next/link';
import { Mail, MessageSquare, Sparkles, Palette, PackageCheck, Clock, MapPin, Send, ArrowLeft, CheckCircle2 } from 'lucide-react';
import toast from 'react-hot-toast';

export default function ContactPage() {

    const [formSubmitted, setFormSubmitted] = useState(false);
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        role: '',
        subject: '',
        message: ''
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        setFormSubmitted(true);
        toast.success("Your query Submitted - We will reach back to you soon.")
    };

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    
    const contactReasons = [
        {
            icon: PackageCheck,
            title: "Order & Transit Support",
            desc: "Need live tracking on an insured shipment, custom customs documentation, or an address update for an artwork en route."
        },
        {
            icon: Palette,
            title: "Artist Onboarding & Tech",
            desc: "Assistance with setting up your Stripe Connect payout routing, portfolio verification, or canvas dimension formatting."
        },
        {
            icon: Sparkles,
            title: "Private Commissions & Press",
            desc: "Looking to commission a bespoke piece from an ArtHub curator, or inquiring about digital gallery partnerships."
        }
    ];

    return (
        <div className="relative min-h-screen overflow-hidden bg-[#11140E] text-white pt-28 pb-24 selection:bg-[#CFE1B9] selection:text-[#11140E]">
            
            
            <div className="absolute left-0 top-1/4 h-150 w-150 -translate-x-1/2 rounded-full bg-[#718355]/15 blur-[180px] pointer-events-none" />
            <div className="absolute bottom-10 right-0 h-125 w-125 translate-x-1/3 rounded-full bg-[#CFE1B9]/10 blur-[150px] pointer-events-none" />

            <div className="relative z-10 mx-auto w-[90%] max-w-7xl">
                
             
                <div className="mb-8">
                    <Link href="/" className="inline-flex items-center gap-2 text-[#97A97C] hover:text-[#CFE1B9] transition-colors text-sm font-semibold">
                        <ArrowLeft size={16} />
                        <span>Return to Gallery</span>
                    </Link>
                </div>

           
                <div className="text-center max-w-3xl mx-auto mb-20">
                    <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#718355]/20 border border-[#718355]/30 text-[#CFE1B9] mb-4 text-xs font-bold uppercase tracking-widest">
                        Direct Support Desk
                    </div>
                    <h1 className="text-4xl sm:text-6xl font-black tracking-tight mb-4 italic">
                        We are here to <span className="bg-linear-to-r from-[#CFE1B9] via-[#97A97C] to-[#718355] bg-clip-text text-transparent">Help.</span>
                    </h1>
                    <p className="text-gray-400 text-base sm:text-lg">
                        Behind every digital pixel is a dedicated human team ready to assist your art journey.
                    </p>
                </div>

              
                <div className="mb-24">
                    <h2 className="text-xs font-black text-gray-500 uppercase tracking-widest text-center mb-8">
                        Why collectors & creators reach out to us
                    </h2>
                    
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
                        {contactReasons.map((item, idx) => {
                            const Icon = item.icon;
                            return (
                                <div 
                                    key={idx}
                                    className="rounded-[2rem] border border-[#CFE1B9]/10 bg-white/5 p-8 backdrop-blur-md transition-all duration-300 hover:border-[#CFE1B9]/30 hover:bg-white/10 hover:-translate-y-1"
                                >
                                    <div className="w-12 h-12 rounded-2xl bg-[#718355]/20 border border-[#718355]/40 flex items-center justify-center text-[#CFE1B9] mb-6">
                                        <Icon size={24} />
                                    </div>
                                    <h3 className="text-xl font-bold text-white mb-2">{item.title}</h3>
                                    <p className="text-gray-400 text-sm leading-relaxed">{item.desc}</p>
                                </div>
                            );
                        })}
                    </div>
                </div>

         
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
                    
            
                    <div className="lg:col-span-5 space-y-8">
                        <div>
                            <h2 className="text-3xl font-black mb-3 text-white">Send a Dispatch now...</h2>
                            <p className="text-gray-400 leading-relaxed text-sm sm:text-base">
                                Fill out the secure form, or utilize our direct studio channels below. We prioritize active transaction dispatches first.
                            </p>
                        </div>

                        <div className="space-y-6 pt-2">
                            <div className="flex items-start gap-4">
                                <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-[#CFE1B9] shrink-0 mt-1">
                                    <Mail size={18} />
                                </div>
                                <div>
                                    <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider">E-Mail</p>
                                    <p className="text-white font-medium">support@arthub.com</p>
                                </div>
                            </div>

                            <div className="flex items-start gap-4">
                                <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-[#CFE1B9] shrink-0 mt-1">
                                    <Clock size={18} />
                                </div>
                                <div>
                                    <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Operating Hours</p>
                                    <p className="text-white font-medium">Mon - Fri: 09:00 AM to 05:00 PM</p>
                                    <p className="text-xs text-gray-400 mt-0.5">Average response window: 4 hours</p>
                                </div>
                            </div>

                            <div className="flex items-start gap-4">
                                <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-[#CFE1B9] shrink-0 mt-1">
                                    <MapPin size={18} />
                                </div>
                                <div>
                                    <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Global Gallery HQ</p>
                                    <p className="text-white font-medium">YKSG-1, DSC , Birula , Dhaka -1216</p>
                                    <p className="text-xs text-gray-400">DSC, Dhaka</p>
                                </div>
                            </div>
                        </div>

                     
                        <div className="p-6 rounded-2xl bg-[#718355]/10 border border-[#718355]/20">
                            <p className="text-xs text-[#CFE1B9] font-medium leading-relaxed">
                                <span className="font-bold">Security Notice:</span> Never paste your Stripe private keys, full banking passwords, or credit card info into support tickets. 
                            </p>
                        </div>
                    </div>

                   
                    <div className="lg:col-span-7 bg-white/5 border border-[#CFE1B9]/15 p-8 sm:p-12 rounded-[2.5rem] backdrop-blur-xl relative">
                        
                        {formSubmitted ? (
                         
                            <div className="py-16 text-center space-y-6 animate-fade-in">
                                <div className="w-20 h-20 bg-[#E9F5DB] text-[#718355] rounded-full flex items-center justify-center mx-auto shadow-[0_0_30px_rgba(207,225,185,0.4)]">
                                    <CheckCircle2 size={40} strokeWidth={2.5} />
                                </div>
                                <h3 className="text-3xl font-black text-white">Message Received</h3>
                                <p className="text-gray-400 max-w-md mx-auto leading-relaxed">
                                    Thank you, <span className="text-white font-bold">{formData.name}</span>. A ticket has been generated under your email. Our curation desk will respond shortly.
                                </p>
                                <button 
                                    onClick={() => setFormSubmitted(false)}
                                    className="text-xs font-bold text-[#CFE1B9] hover:underline pt-4 block mx-auto uppercase tracking-widest"
                                >
                                    Send another inquiry
                                </button>
                            </div>
                        ) : (
                         
                            <form onSubmit={handleSubmit} className="space-y-6">
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                                    <div>
                                        <label className="block text-xs font-bold uppercase tracking-wider text-gray-300 mb-2">Your Name *</label>
                                        <input 
                                            required
                                            type="text" 
                                            name="name"
                                            value={formData.name}
                                            onChange={handleChange}
                                            placeholder="Jean-Michel Basquiat"
                                            className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3.5 text-white placeholder:text-gray-600 focus:outline-none focus:border-[#CFE1B9] transition-colors text-sm"
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-xs font-bold uppercase tracking-wider text-gray-300 mb-2">Email Address *</label>
                                        <input 
                                            required
                                            type="email" 
                                            name="email"
                                            value={formData.email}
                                            onChange={handleChange}
                                            placeholder="basquiat@studio.org"
                                            className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3.5 text-white placeholder:text-gray-600 focus:outline-none focus:border-[#CFE1B9] transition-colors text-sm"
                                        />
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                                    <div>
                                        <label className="block text-xs font-bold uppercase tracking-wider text-gray-300 mb-2">I am representing a... *</label>
                                        <select 
                                            name="role"
                                            value={formData.role}
                                            onChange={handleChange}
                                            className="w-full bg-[#0D0F0B] border border-white/10 rounded-xl px-4 py-3.5 text-white focus:outline-none focus:border-[#CFE1B9] transition-colors text-sm"
                                        >
                                            <option value="collector">Private Collector</option>
                                            <option value="artist">Registered Artist</option>
                                            <option value="gallery">Physical Gallery</option>
                                            <option value="press">Press / Media</option>
                                        </select>
                                    </div>

                                    <div>
                                        <label className="block text-xs font-bold uppercase tracking-wider text-gray-300 mb-2">Subject *</label>
                                        <input 
                                            required
                                            type="text" 
                                            name="subject"
                                            value={formData.subject}
                                            onChange={handleChange}
                                            placeholder="Regarding Artwork #6a366a..."
                                            className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3.5 text-white placeholder:text-gray-600 focus:outline-none focus:border-[#CFE1B9] transition-colors text-sm"
                                        />
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-xs font-bold uppercase tracking-wider text-gray-300 mb-2">Inquiry Details *</label>
                                    <textarea 
                                        required
                                        rows={5}
                                        name="message"
                                        value={formData.message}
                                        onChange={handleChange}
                                        placeholder="Please provide order numbers or artwork IDs if applicable..."
                                        className="w-full bg-black/40 border border-white/10 rounded-xl p-4 text-white placeholder:text-gray-600 focus:outline-none focus:border-[#CFE1B9] transition-colors text-sm resize-none"
                                    ></textarea>
                                </div>

                                <button 
                                    type="submit"
                                    className="w-full bg-linear-to-r from-[#CFE1B9] via-[#97A97C] to-[#718355] text-[#11140E] font-black py-4 rounded-xl hover:opacity-90 transition-opacity flex items-center justify-center gap-2 text-base shadow-lg"
                                >
                                    <span>Transmit Dispatch</span>
                                    <Send size={18} />
                                </button>
                            </form>
                        )}

                    </div>

                </div>

            </div>
        </div>
    );
}