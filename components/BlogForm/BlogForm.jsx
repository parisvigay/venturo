"use client"

import { useState, useRef } from 'react';
import './BlogForm.css'
import { Input, Select, Option, Textarea, Card, Button, Checkbox } from '@mui/joy';
import ReactGoogleAutocomplete from 'react-google-autocomplete';
import { onPlaceSelectedHandler } from '../ReactGoogleAutocomplete/ReactGoogleAutocomplete';

export default function BlogForm() {
    const [formData, setFormData]=useState({
        title: '',
        introduction: '',
        body: '',
        photos: [],
        location: [],
        userId: null,
        collecitonIds: []
    });

    const titleRef = useRef();
    const collectionRef = useRef();
    const introductionRef = useRef();
    const bodyRef = useRef();
    const photosRef = useRef();

    const updatedState = () => {
        setFormData({
            title: titleRef.current.value,
            collection: collectionRef.current.value,
            introduction: introductionRef.current.value,
            body: bodyRef.current.value,
            photos: photosRef.current.value
        });
    };

    async function submitBlog(e) {
        e.preventDefault();
        updatedState();

        try {
           const response = await fetch('http://localhost:3000/blogs/new', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
            });
            
            if (response.ok) {
                console.log('Okay!');
            } else {
                console.log('Bad!');
            }
        } catch (error){
            console.error(error);
        }
    };

  return (
    <div className="blogFormMain">
        <h1 className='blogH1'>Create a blog post</h1>
        <form className='blogForm'>
            <Input className='blogTitle'
            color="neutral"
            disabled={false}
            size="md"
            placeholder="Title"
            variant="outlined"
            required
            ref={titleRef}
            />
            <div className="LocationAndCollectionContainer">
                <ReactGoogleAutocomplete className='locationAndCollection'
                apiKey={process.env.YOUR_GOOGLE_MAPS_API_KEY}           
                onPlaceSelected={onPlaceSelectedHandler}
                />
                <Select className='locationAndCollection'
                placeholder="Collection"
                size="md"
                variant="outlined"
                >
                <Option value="location1">Collection 1</Option>
                <Option value="location2">Collection 2</Option>
                </Select>
            </div>
            <Textarea className="blogIntro"
            size="lg" 
            placeholder="Introduction"
            ref={introductionRef}
            />
            <Textarea className="blogBody"
            size="lg"  
            placeholder="Body"
            ref={bodyRef}
            />
            <Card className="uploadPhotos"
            size="lg">
                <div className="urlAndSubmitContainer">
                    <Input className='url'
                    color="neutral"
                    disabled={false}
                    size="md"
                    placeholder="Url"
                    variant="outlined"
                    required
                    ref={photosRef}
                    />
                    <Button className='submitPhoto'
                    // onClick={submitPhoto}
                    size="md"
                    variant="outlined"
                    >Upload
                    </Button>
                </div>
                <div className="photoContainer">
                    <Card className="photo"></Card>
                    <Checkbox
                    label="Main"
                    color='primary'
                    size="md"
                    variant="solid"
                    />        
                    <Card className="photo"></Card>
                    <Checkbox
                    label="Main"
                    color='primary'
                    size="md"
                    variant="solid"
                    />        
                    <Card className="photo"></Card>
                    <Checkbox
                    label="Main"
                    color='primary'
                    size="md"
                    variant="solid"
                    />
                </div>        
            </Card> 
            <Button className='submitForm'
            onClick={submitBlog}
            size="md"
            variant="outlined"
            >Submit
            </Button>
        </form>
    </div>
  )
}
