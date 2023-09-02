import React, { useEffect, useState } from "react";
import Modal from "react-modal";
import { useToast } from "@chakra-ui/react";
import { set, useForm } from "react-hook-form";
import { registerUser } from "../../../services/auth.services";
import {
    createUserHandle,
    getUserByHandle,
    getUserByPhone,
} from "../../../services/user.service";
import { Link, useNavigate } from "react-router-dom";
import { customStylesSignUp } from "../../../common/modal.helper.functions";
// import DatePicker from "./DatePicker";
import MonthCalendarLandingPage from "../../Calendar/Month/MonthCalendarLandingPage";
import dayjs from "dayjs";
import { eventReoccurrence } from "../../../common/enums/events.enum";
import { useAuth } from "../../../contexts/AuthContext";
import { createEventHandle, editEventHandle } from "../../../services/event.service";

const customStyles = {
    content: {
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        width: "50rem",
        height: "40rem",
        padding: "20px",
        borderRadius: "8px",
        boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
    },
};
const EditEvent = ({ eventData, isOpen, onRequestClose,refreshEventData  }) => {
    const currentDate = dayjs();
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm();
    const toast = useToast();
    const navigate = useNavigate();
    const repeatEvent = Object.values(eventReoccurrence);
    const startDate = eventData ? new Date(eventData.startDate) : new Date();
    const endDate = eventData ? new Date(eventData.endDate) : new Date();
    const formattedStartDate = startDate.toISOString().slice(0, 16);
    const formattedEndDate = endDate.toISOString().slice(0, 16);


    function formatDateToISOString(date) {
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');
        const hours = String(date.getHours()).padStart(2, '0');
        const minutes = String(date.getMinutes()).padStart(2, '0');
        return `${year}-${month}-${day}T${hours}:${minutes}`;
    }

    const defaultValues = eventData
        ? {
            title: eventData?.title,
            publicity: eventData?.publicity,
            startDate: formattedStartDate,
            endDate: formattedEndDate,
            imageUrl: eventData?.imageUrl,
            repeat: eventData?.repeat,
            location: eventData?.location,
            description: eventData?.description,
        }
        : {};

    const onSubmit = async (data) => {
        try {
            let { startDate, endDate, ...dataWithoutDates } = data;
            startDate =Date.parse(startDate);
            endDate = Date.parse(endDate);
            const combinedData = { ...eventData, ...dataWithoutDates};
            combinedData.startDate = startDate;
            combinedData.endDate = endDate;
            
            const success=await editEventHandle(eventData?.id,combinedData)
            if(success){
                toast({
                    title: "Event is created successfully!",
                    description: "Your event is added to the calendar.",
                    status: "success",
                    duration: 5000,
                    isClosable: true,
                });
                onRequestClose();
                refreshEventData();
            }
        
        } catch (error) {
            toast({
                title: "Error! Event is not created!",
                description: error.message,
                status: "error",
                duration: 5000,
                isClosable: true,
            });
        }
    };

    return (
        <Modal isOpen={isOpen} onRequestClose={onRequestClose} style={customStyles}>
            <div className="flex justify-center items-center">
                <div className="p-4 w-4/5">
                    <h1 className="text-3xl font-bold mb-4 text-purple-800 border-b-2 border-purple-800">
                        Edit Event
                    </h1>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        {/* Title */}
                        <div className="mb-4">
                            <label className="block font-bold mb-1">Title</label>
                            <input
                                type="text"
                                name="title"
                                className={`border p-2 w-full ${errors.title ? "border-red-500" : ""
                                    }`}
                                {...register("title", {
                                    required: "Title is required",
                                    minLength: {
                                        value: 3,
                                        message: "First name must be at least 3 characters",
                                    },
                                    maxLength: {
                                        value: 30,
                                        message: "First name must not exceed 30 characters",
                                    },
                                })}
                                defaultValue={defaultValues.title}
                            />
                            {errors.title && (
                                <span className="text-red-500">{errors.title.message}</span>
                            )}
                        </div>

                        {/* Publicity */}
                        <div className="flex gap-4 mb-4">
                            <label className="block font-bold mb-1">Event is:</label>
                            <input
                                type="radio"
                                id="huey"
                                name="publicity"
                                value="private"
                                defaultChecked={defaultValues.publicity === "private"}
                                {...register("publicity")}
                            />
                            <label htmlFor="huey">Private</label>

                            <input
                                type="radio"
                                id="dewey"
                                name="publicity"
                                value="public"
                                defaultChecked={defaultValues.publicity === "public"}
                                {...register("publicity")}
                            />
                            <label htmlFor="dewey">Public</label>
                        </div>

                        {/* Date and Time */}
                        <div className="flex gap-3 mb-3">
                            <div>
                                <label className="block font-bold mb-1">
                                    Select start date and time:
                                </label>
                                <div className="flex gap-2">
                                    <input
                                        type="datetime-local"
                                        name="startDate"
                                        min={currentDate.format("YYYY-MM-DDTHH:mm")}
                                        defaultValue={formatDateToISOString(new Date(eventData?.startDate))}
                                        {...register("startDate", {
                                            valueAsDate: true,
                                        })}
                                        className="border p-1 w-full"
                                    />
                                </div>
                            </div>
                            <div>
                                <label className="block font-bold mb-1">
                                    Select end date and time:
                                </label>
                                <div className="flex gap-2">
                                    <input
                                        type="datetime-local"
                                        name="endDate"
                                        min={defaultValues?.startDate}
                                        defaultValue={formatDateToISOString(new Date(eventData?.endDate))}
                                        {...register("endDate", {
                                            valueAsDate: true,
                                        })}
                                        className="border p-1 w-full"
                                    />
                                </div>
                            </div>
                        </div>
                        <label className="block mb-4">
                            * Time will be rounded to the nearest half-hour
                        </label>

                        <div className="mb-4">
                            <label className="block font-bold mb-1">Image URL</label>
                            <input
                                type="text"
                                name="imageUrl"
                                className="border p-1 w-full"
                                defaultValue={defaultValues.imageUrl || ""}
                                {...register("imageUrl")}
                            />
                        </div>

                        <div className="flex gap-3 mb-4">
                            <div>
                                <label className="block font-bold mb-1">Repeat:</label>
                                <select
                                    placeholder="Choose..."
                                    className="border p-1 w-full"
                                    defaultValue={defaultValues.repeat || ""}
                                    {...register("repeat")}
                                >
                                    {repeatEvent.map((reoccurrence) => (
                                        <option key={reoccurrence} value={reoccurrence}>
                                            {reoccurrence}
                                        </option>
                                    ))}
                                </select>
                            </div>
                        </div>

                        <div className="flex gap-3 mb-4">
                            <div>
                                <label className="block font-bold mb-1">Location:</label>
                                <input
                                    type="text"
                                    name="location"
                                    className="border p-1 w-full"
                                    defaultValue={defaultValues.location || ""}
                                    {...register("location")}
                                />
                            </div>
                        </div>

                        <div className="mb-4">
                            <label className="block font-bold mb-1">Description</label>
                            <textarea
                                type="text"
                                name="description"
                                className="border p-1 w-full"
                                defaultValue={defaultValues.description || ""}
                                {...register("description", {
                                    minLength: {
                                        value: 20,
                                        message: "Description must be at least 20 characters",
                                    },
                                    maxLength: {
                                        value: 500,
                                        message: "The description must be at most 500 characters",
                                    },
                                })}
                            />
                            {errors.description && (
                                <span className="text-red-500">{errors.description.message}</span>
                            )}
                        </div>
                        <div className="flex justify-end gap-3">
                            <div>
                                <button
                                    className="w-32 bg-gray-300 hover:bg-gray-400 py-2 px-2 rounded mx-auto"
                                    onClick={onRequestClose}
                                >
                                    Cancel
                                </button>
                            </div>
                            <div>
                                <button
                                    className="w-32 bg-purple-800 hover:bg-purple-500 text-white py-2 px-2 rounded mx-auto"
                                    type="submit"
                                >
                                    Submit
                                </button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </Modal>
    );
};

export default EditEvent;
