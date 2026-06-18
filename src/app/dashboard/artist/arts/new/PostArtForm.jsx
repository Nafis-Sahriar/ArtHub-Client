"use client";
import React, { useState } from "react";
import {
  Form,
  TextField,
  Input,
  Label,
  FieldError,
  TextArea,
  Select,
  ListBox,
  Button,
  Chip
} from "@heroui/react";
import { Palette, ImagePlus, DollarSign, Ruler, HelpCircle, X } from "lucide-react";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { createArtwork } from "@/lib/actions/artworks";

const PostArtForm = ({ artist }) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [imagePreview, setImagePreview] = useState(null);
  
  // NEW: Store the actual file object securely in React state
  const [imageFile, setImageFile] = useState(null); 
  
  const router = useRouter();

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file); // Save the file to state immediately
      const previewUrl = URL.createObjectURL(file);
      setImagePreview(previewUrl);
    } else {
      setImageFile(null);
      setImagePreview(null);
    }
  };

  const handleRemoveImage = () => {
    setImageFile(null);
    setImagePreview(null);
  };

  console.log(artist);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      const formData = new FormData(e.target);
      const artData = Object.fromEntries(formData.entries());
      
      let uploadedImageUrl = "";

      
      if (imageFile && imageFile.name && imageFile.size > 0) {
        const loadingToast = toast.loading("Uploading artwork image to ImgBB...");
        
        const imgData = new FormData();
        imgData.append("image", imageFile); 

        const imgbbKey = process.env.NEXT_PUBLIC_IMAGE_UPLOAD_API; 
        
        const imgRes = await fetch(`https://api.imgbb.com/1/upload?key=${imgbbKey}`, {
          method: "POST",
          body: imgData,
        });
        
        const imgResult = await imgRes.json();
        
        toast.dismiss(loadingToast);

        if (imgResult.success) {
          uploadedImageUrl = imgResult.data.display_url;
        } else {
          throw new Error("Failed to upload image to ImgBB");
        }
      } else {
        throw new Error("Please select an image for your artwork.");
      }

     const payload = {
        title: artData.title,
        category: artData.category,
        description: artData.description,
        price: Number(artData.price),
        dimensions: `${artData.width} x ${artData.height} cm`,
        imageUrl: uploadedImageUrl,
        
        // FIXED: Safely grab the ID whether it's named 'id' or '_id'
        artistId: artist?.id || artist?._id, 
        artistName: artist?.name,
        artistEmail: artist?.email,
        status: "available",
        createdAt: new Date().toISOString(),
      };

      console.log("Ready to send to backend:", payload);


      const res= await createArtwork(payload);
      if(res.insertedId) {
        toast.success("Artwork published successfully!");
        router.push("/dashboard/artist");
      } else {        
        toast.error("Failed to create artwork. Please try again.");
      }

      
      e.target.reset();
      setImageFile(null);
      setImagePreview(null);
      

    } catch (error) {
      console.error(error);
      toast.error(error.message || "Something went wrong.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="mx-auto max-w-5xl pb-12">

      <div className="mb-8 px-2">
        <h2 className="text-3xl font-bold tracking-tight text-[#718355]">
          Add New Artwork
        </h2>
        <p className="mt-2 text-sm text-[#97A97C]">
          Showcase your latest creation to collectors worldwide.
        </p>
        
        <div className="mt-4">
            {artist?.status.toLowerCase() === "approved" ? (
                <Chip className="bg-[#E9F5DB] text-[#718355] font-semibold border border-[#CFE1B9]">
                    Verified Artist
                </Chip>
            ) : (
                <Chip className="bg-yellow-100 text-yellow-700 font-semibold border border-yellow-200">
                    {artist?.status || "Pending Approval"}
                </Chip>
            )}
        </div>
      </div>

      {artist?.status.toLowerCase() === "approved" ? (
        <Form className="space-y-6" onSubmit={handleSubmit}>

          <div className="w-full rounded-3xl border border-[#CFE1B9]/50 bg-white p-6 md:p-8 shadow-sm transition-all hover:shadow-md">
            <div className="mb-6 flex items-center gap-3 border-b border-[#CFE1B9]/30 pb-4">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#E9F5DB]">
                <Palette size={20} className="text-[#718355]" />
              </div>
              <h3 className="text-xl font-bold text-[#718355]">
                Artwork Details
              </h3>
            </div>

            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              <TextField name="title" isRequired>
                <Label className="text-sm font-semibold text-gray-700">Artwork Title</Label>
                <Input placeholder="e.g. Starry Night Recreation" className="rounded-xl border-[#CFE1B9] focus-within:border-[#718355]" />
                <FieldError />
              </TextField>

              <Select name="category" placeholder="Select Medium" isRequired>
                <Label className="text-sm font-semibold text-gray-700">Medium / Category</Label>
                <Select.Trigger className="rounded-xl border-[#CFE1B9]">
                  <Select.Value />
                  <Select.Indicator />
                </Select.Trigger>
                <Select.Popover>
                  <ListBox>
                    <ListBox.Item id="oil" textValue="Oil Painting">Oil Painting</ListBox.Item>
                    <ListBox.Item id="watercolor" textValue="Watercolor">Watercolor</ListBox.Item>
                    <ListBox.Item id="acrylic" textValue="Acrylic">Acrylic</ListBox.Item>
                    <ListBox.Item id="digital" textValue="Digital Art">Digital Art</ListBox.Item>
                    <ListBox.Item id="sculpture" textValue="Sculpture">Sculpture</ListBox.Item>
                  </ListBox>
                </Select.Popover>
                <FieldError />
              </Select>

              <TextField name="description" className="md:col-span-2" isRequired>
                <Label className="text-sm font-semibold text-gray-700">Description & Inspiration</Label>
                <TextArea
                  className="rounded-xl border-[#CFE1B9]"
                  placeholder="Share the story, inspiration, and techniques behind this piece..."
                  rows={4}
                />
                <FieldError />
              </TextField>
            </div>
          </div>

          <div className="w-full rounded-3xl border border-[#CFE1B9]/50 bg-white p-6 md:p-8 shadow-sm transition-all hover:shadow-md">
            <div className="mb-6 flex items-center gap-3 border-b border-[#CFE1B9]/30 pb-4">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#E9F5DB]">
                <Ruler size={20} className="text-[#718355]" />
              </div>
              <h3 className="text-xl font-bold text-[#718355]">
                Physical Dimensions
              </h3>
            </div>

            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              <TextField name="width" type="number" isRequired>
                <Label className="text-sm font-semibold text-gray-700">Width (cm)</Label>
                <Input type="number" placeholder="e.g. 60" min="1" className="rounded-xl border-[#CFE1B9]" />
                <FieldError />
              </TextField>

              <TextField name="height" type="number" isRequired>
                <Label className="text-sm font-semibold text-gray-700">Height (cm)</Label>
                <Input type="number" placeholder="e.g. 90" min="1" className="rounded-xl border-[#CFE1B9]" />
                <FieldError />
              </TextField>
            </div>
          </div>

          <div className="w-full rounded-3xl border border-[#CFE1B9]/50 bg-white p-6 md:p-8 shadow-sm transition-all hover:shadow-md">
            <div className="mb-6 flex items-center gap-3 border-b border-[#CFE1B9]/30 pb-4">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#E9F5DB]">
                <DollarSign size={20} className="text-[#718355]" />
              </div>
              <h3 className="text-xl font-bold text-[#718355]">
                Pricing
              </h3>
            </div>

            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              <TextField name="price" type="number" isRequired>
                <Label className="text-sm font-semibold text-gray-700">Price (USD)</Label>
                <Input type="number" placeholder="e.g. 250" min="1" className="rounded-xl border-[#CFE1B9]" />
                <FieldError />
              </TextField>
            </div>
          </div>

          <div className="w-full rounded-3xl border border-[#CFE1B9]/50 bg-white p-6 md:p-8 shadow-sm transition-all hover:shadow-md">
            <div className="mb-6 flex items-center gap-3 border-b border-[#CFE1B9]/30 pb-4">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#E9F5DB]">
                <ImagePlus size={20} className="text-[#718355]" />
              </div>
              <h3 className="text-xl font-bold text-[#718355]">
                Artwork Media
              </h3>
            </div>

            <div className="grid grid-cols-1 gap-6">
              {/* FIXED: Removed the name="image" wrapper field that was confusing FormData */}
              <div>
                <Label className="text-sm font-semibold text-gray-700 mb-2 block">Upload High-Quality Image</Label>
                
                <div className="flex items-center justify-center w-full">
                  {imagePreview ? (
                    <div className="relative w-full md:w-2/3 h-64 md:h-80 rounded-2xl overflow-hidden border-4 border-[#E9F5DB] shadow-sm group">
                      <img 
                        src={imagePreview} 
                        alt="Artwork Preview" 
                        className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105" 
                      />
                      <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                         <button
                           type="button"
                           onClick={handleRemoveImage}
                           className="flex items-center gap-2 bg-red-500 text-white px-4 py-2 rounded-xl hover:bg-red-600 transition-colors shadow-lg"
                         >
                           <X size={18} /> Remove Image
                         </button>
                      </div>
                    </div>
                  ) : (
                    <label className="flex flex-col items-center justify-center w-full h-44 border-2 border-[#CFE1B9] border-dashed rounded-2xl cursor-pointer bg-[#F4F7F0] hover:bg-[#E9F5DB] transition-colors">
                      <div className="flex flex-col items-center justify-center pt-5 pb-6">
                        <ImagePlus className="w-8 h-8 mb-3 text-[#97A97C]" />
                        <p className="mb-2 text-sm text-[#718355]"><span className="font-semibold">Click to upload</span> or drag and drop</p>
                        <p className="text-xs text-gray-500">SVG, PNG, JPG or GIF (MAX. 800x400px)</p>
                      </div>
                      <input 
                        type="file" 
                        className="hidden" 
                        accept="image/*" 
                        onChange={handleImageChange} 
                      />
                    </label>
                  )}
                </div>
                {!imageFile && <p className="text-xs text-red-500 mt-2">Image is required.</p>}
              </div>
            </div>
          </div>

          <div className="pt-4 pb-10">
            <Button
                type="submit"
                isDisabled={isSubmitting || !imageFile}
                className="w-full md:w-auto rounded-xl bg-[#718355] px-10 py-6 text-lg font-semibold text-white hover:bg-[#87986A] transition-colors shadow-lg shadow-[#718355]/20"
            >
                {isSubmitting ? "Publishing Artwork..." : "Publish Artwork"}
            </Button>
          </div>

        </Form>
      ) : (
        <div className="w-full rounded-3xl border flex items-center justify-center flex-col border-yellow-200 bg-yellow-50 p-10 text-center shadow-sm">
          <HelpCircle className="text-yellow-500 mb-4" size={56} />
          <h3 className="text-2xl font-bold text-yellow-800 mb-3">
            Profile Under Review
          </h3>
          <p className="text-yellow-700 max-w-md mx-auto">
            Your artist profile is currently pending approval. To maintain marketplace quality, you cannot post artworks until an admin approves your account.
          </p>
        </div>
      )}

    </div>
  );
};

export default PostArtForm;