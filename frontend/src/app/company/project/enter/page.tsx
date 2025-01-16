"use client";

import React from 'react';
import { useForm, Controller } from 'react-hook-form';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Form, FormField, FormItem, FormLabel, FormControl } from '@/components/ui/form';
import { Button } from '@/components/ui/button';

const ProjectInputPage = () => {
  const { control, handleSubmit } = useForm({
    defaultValues: {
      companyName: '',
      projectName: '',
      projectDetail: '',
      members: '',
      technologies: ''
    }
  });

  const onSubmit = (data: any) => {
    console.log({
      ...data,
      members: data.members.split(','),
      technologies: data.technologies.split(',')
    });
  };

  return (
    <div className="container mx-auto p-6">
      <Card className="p-6">
        <h1 className="text-2xl font-bold mb-4">案件入力</h1>
        <form onSubmit={handleSubmit(onSubmit)}>
          <FormField name="companyName" control={control}>
            <FormItem>
              <FormLabel>案件元会社名</FormLabel>
              <FormControl>
                <Controller
                  name="companyName"
                  control={control}
                  render={({ field }) => <Input {...field} />}
                />
              </FormControl>
            </FormItem>
          </FormField>
          <FormField name="projectName" control={control}>
            <FormItem>
              <FormLabel>案件名</FormLabel>
              <FormControl>
                <Controller
                  name="projectName"
                  control={control}
                  render={({ field }) => <Input {...field} />}
                />
              </FormControl>
            </FormItem>
          </FormField>
          <FormField name="projectDetail" control={control}>
            <FormItem>
              <FormLabel>案件詳細</FormLabel>
              <FormControl>
                <Controller
                  name="projectDetail"
                  control={control}
                  render={({ field }) => <Input {...field} />}
                />
              </FormControl>
            </FormItem>
          </FormField>
          <FormField name="members" control={control}>
            <FormItem>
              <FormLabel>メンバー (カンマ区切り)</FormLabel>
              <FormControl>
                <Controller
                  name="members"
                  control={control}
                  render={({ field }) => <Input {...field} />}
                />
              </FormControl>
            </FormItem>
          </FormField>
          <FormField name="technologies" control={control}>
            <FormItem>
              <FormLabel>使用技術 (カンマ区切り)</FormLabel>
              <FormControl>
                <Controller
                  name="technologies"
                  control={control}
                  render={({ field }) => <Input {...field} />}
                />
              </FormControl>
            </FormItem>
          </FormField>
          <Button type="submit">送信</Button>
        </form>
      </Card>
    </div>
  );
};

export default ProjectInputPage;