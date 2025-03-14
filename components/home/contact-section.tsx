'use client'

import type React from 'react'
import { motion } from 'framer-motion'
import { Mail, Phone, MapPin } from 'lucide-react'

import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { FadeInWhenVisible } from '@/components/motions/scroll-animation'

export function ContactSection() {
    return (
        <section id='contact' className='py-20 px-20 bg-muted/30'>
            <div className='container'>
                <FadeInWhenVisible className='text-center mb-16'>
                    <Button variant='outline' className='text-xl text-fluo-500 font-medium rounded-full bg-muted/30 dark:bg-black mb-1'>
                        Contact
                    </Button>
                    <h2 className='text-3xl font-bold mb-4'>Get In Touch</h2>
                    <p className='text-muted-foreground max-w-2xl mx-auto'>
                        Have a project in mind or want to discuss potential opportunities? Feel free to reach out!
                    </p>
                </FadeInWhenVisible>

                <div className='grid grid-cols-1 lg:grid-cols-3 gap-8'>
                    <motion.div
                        initial={{ opacity: 0, x: 30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                    >
                        <Card className='h-full border-none'>
                            <CardContent className='p-6'>
                                <h3 className='text-xl font-bold mb-6'>Contact Information</h3>
                            </CardContent>
                        </Card>
                    </motion.div>
                    <motion.div
                        initial={{ opacity: 0, x: 30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                    >
                        <Card className='h-full border-none'>
                            <CardContent className='p-6'>
                                <h3 className='text-xl font-bold mb-6'>Contact Information</h3>
                            </CardContent>
                        </Card>
                    </motion.div>
                    <motion.div
                        initial={{ opacity: 0, x: 30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                    >
                        <Card className='h-full border-none'>
                            <CardContent className='p-6'>
                                <h3 className='text-xl font-bold mb-6'>Contact Information</h3>
                            </CardContent>
                        </Card>
                    </motion.div>
                </div>
            </div>
        </section>
    )
}
