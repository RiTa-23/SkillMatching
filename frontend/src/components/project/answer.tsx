"use client";

import React, { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import fetcher from "@/lib/fetcher"; // Fetchラッパー関数

const FeedbackForm: React.FC = () => {
    const [projects, setProjects] = useState<{ project_id: number; title: string }[]>([]);
    const [users, setUsers] = useState<{ user_id: number; name: string }[]>([]);
    const [roles, setRoles] = useState<{ role_id: number; role_name: string }[]>([]);
    const [projectId, setProjectId] = useState("");
    const [userId, setUserId] = useState("");
    const [roleId, setRoleId] = useState("");
    const [feedback, setFeedback] = useState("");
    const [rating, setRating] = useState("");

    // データを取得
    useEffect(() => {
        const fetchOptions = async () => {
            try {
                // Projects を取得
                const projectRes = await fetcher<{ project_id: number; title: string }[]>({
                    url: "project",
                    method: "GET",
                });
                setProjects(projectRes.data || []);

                // Users を取得
                const userRes = await fetcher<{ user_id: number; name: string }[]>({
                    url: "users",
                    method: "GET",
                });
                setUsers(userRes.data || []);

                // Roles を取得
                const roleRes = await fetcher<{ role_id: number; role_name: string }[]>({
                    url: "role",
                    method: "GET",
                });
                setRoles(roleRes.data || []);
            } catch (error) {
                console.error("Failed to fetch data:", error);
                setProjects([]); // エラーハンドリング
                setUsers([]);    // エラーハンドリング
                setRoles([]);    // エラーハンドリング
            }
        };

        fetchOptions();
    }, []);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const payload = { project_id: projectId, user_id: userId, role_id: roleId, feedback, rating };

        try {
            const { data, error } = await fetcher({
                url: "feedback",
                method: "POST",
                body: payload,
            });

            if (data) {
                console.log("Feedback submitted successfully:", data);
            }
            if (error) {
                console.error("Validation errors:", error);
            }
        } catch (error) {
            console.error("An unexpected error occurred:", error);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-4">
                <label htmlFor="project-select" className="block text-sm font-medium text-gray-700">
                    Project
                </label>
                <select
                    id="project-select"
                    value={projectId}
                    onChange={(e) => setProjectId(e.target.value)}
                    className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                    required
                >
                    <option value="">Select a project</option>
                    {projects.map((project) => (
                        <option key={project.project_id} value={project.project_id}>
                            {project.title}
                        </option>
                    ))}
                </select>
            </div>

            <div className="space-y-4">
                <label htmlFor="user-select" className="block text-sm font-medium text-gray-700">
                    User
                </label>
                <select
                    id="user-select"
                    value={userId}
                    onChange={(e) => setUserId(e.target.value)}
                    className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                    required
                >
                    <option value="">Select a user</option>
                    {users.map((user) => (
                        <option key={user.user_id} value={user.user_id}>
                            {user.name}
                        </option>
                    ))}
                </select>
            </div>

            <div className="space-y-4">
                <label htmlFor="role-select" className="block text-sm font-medium text-gray-700">
                    Role
                </label>
                <select
                    id="role-select"
                    value={roleId}
                    onChange={(e) => setRoleId(e.target.value)}
                    className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                    required
                >
                    <option value="">Select a role</option>
                    {roles.map((role) => (
                        <option key={role.role_id} value={role.role_id}>
                            {role.role_name}
                        </option>
                    ))}
                </select>
            </div>

            <div className="space-y-4">
                <Textarea
                    placeholder="Feedback"
                    value={feedback}
                    onChange={(e) => setFeedback(e.target.value)}
                    className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                />
            </div>

            <div className="space-y-4">
                <Input
                    type="number"
                    placeholder="Rating (1-5)"
                    value={rating}
                    onChange={(e) => setRating(e.target.value)}
                    className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                />
            </div>

            <Button type="submit" className="w-full bg-indigo-600 text-white hover:bg-indigo-700">
                Submit Feedback
            </Button>
        </form>
    );

};

export default FeedbackForm;
