"use client"
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Field, Formik, Form, FormikErrors, FormikValues } from "formik";
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import React from 'react'

export default function ContactUsForm({ url }: { url: string }) {

    return (
        <div className='grid grid-cols-1 gap-5 mt-5 w-full items-center h-full'>
            <Formik
                initialValues={{ fName: '', lName: '', email: '', Message: '' }}
                validate={values => {
                    const errors: FormikErrors<FormikValues> = {};
                    if (!values.fName) {
                        errors.fName = 'Required';
                    } else if (values.fName.length < 4) {
                        errors.fName = 'Must be 4 characters or less';
                    }
                    if (!values.lName) {
                        errors.lName = 'Required';
                    } else if (values.lName.length < 5) {
                        errors.lName = 'Must be 5 characters or less';
                    }
                    if (!values.email) {
                        errors.email = 'Required';
                    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)) {
                        errors.email = 'Invalid email address';
                    }
                    if (!values.Message) {
                        errors.Message = 'Required';
                    } else if (values.Message.length > 200) {
                        errors.Message = 'Must be 200 characters or less';
                    }
                    return errors;
                }}
                onSubmit={async (values, { setSubmitting }) => {
                    try {
                        const response = await fetch(`/api/contact`, {
                            method: 'POST',
                            headers: {
                                'Content-Type': 'application/json',
                            },
                            body: JSON.stringify(values),
                        });

                        if (response.ok) {
                            alert('Mesajınız başarıyla gönderildi')
                        } else {
                            alert('Bir hata oluştu')
                        }
                    } catch (error) {
                        console.log(error)
                    }
                    setSubmitting(false)
                }}
            >
                {({
                    values,
                    errors,
                    touched,
                    handleChange,
                    handleBlur,
                }) => (
                    <Form className='grid grid-cols-1 sm:grid-cols-2 gap-2 h-full'>
                        <div>
                            <Label htmlFor='fName'>FIRST NAME*</Label>
                            <Input
                                id='fName'
                                type='text'
                                placeholder='First Name'
                                className='mt-2'
                                name='fName'
                                value={values.fName}
                                onChange={handleChange}
                                onBlur={handleBlur}
                            />
                            {errors.fName && touched.fName && errors.fName}
                        </div>

                        <div>
                            <Label htmlFor='lName'>LAST NAME*</Label>
                            <Input
                                id='lName'
                                name='lName'
                                type='text'
                                placeholder='Last Name'
                                className='mt-2'
                                value={values.lName}
                                onChange={handleChange}
                                onBlur={handleBlur}
                            />
                            {errors.lName && touched.lName && errors.lName}
                        </div>



                        <div className='sm:col-span-2 w-full'>
                            <Label htmlFor='email'>EMAIL*</Label>
                            <Input
                                id='email'
                                type='email'
                                placeholder='Email'
                                className='mt-2'
                                name='email'
                                value={values.email}
                                onChange={handleChange}
                                onBlur={handleBlur}
                            />
                            {errors.email && touched.email && errors.email}
                        </div>

                        <div className='sm:col-span-2 w-full'>
                            <Label htmlFor="Message" className='mb-2'>MESSAGE</Label>
                            <Textarea
                                className='resize-none'
                                id='Message'
                                placeholder='Message'
                                name='Message'
                                rows={4}
                                cols={60}
                                value={values.Message}
                                onChange={handleChange}
                                onBlur={handleBlur}
                            />
                            <Button type='submit' className='w-full mt-2'>Submit</Button>
                        </div>

                    </Form>
                )}
            </Formik>

            <div className='col-span-2'>
                <h4>EMAIL ME</h4>
                <a href='mailto:ahmetk.tanriverdi@gmail.com'>ahmetk.tanriverdi@gmail.com</a>
            </div>
            <div className='flex gap-5 h-1/2 justify-end mt-auto'>
                <a href='mailto:ahmetk.tanriverdi@gmail.com'>ahmetk.tanriverdi@gmail.com</a>
                <Link href='https://www.linkedin.com/in/ahmet-kerem-tanr%C4%B1verdi-b69927254/'>Linkedin</Link>
                <Link href='https://www.linkedin.com/in/ahmet-kerem-tanr%C4%B1verdi-b69927254/'>Github</Link>
            </div>
        </div>
    )
}
