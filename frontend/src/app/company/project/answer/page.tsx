"use client";

import React from "react";
import FeedbackForm from "@/components/project/answer";

const FeedbackPage: React.FC = () => {
    return (
        <div className="container mx-auto mt-8">
            <h1 className="text-2xl font-bold mb-4">Submit Feedback</h1>
            <FeedbackForm />
        </div>
    );
};

export default FeedbackPage;
