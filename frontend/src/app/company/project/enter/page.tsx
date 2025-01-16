"use client";

import React from 'react';
import { useForm, FormProvider,Controller } from 'react-hook-form';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Form, FormField, FormItem, FormLabel, FormControl } from '@/components/ui/form';
import { Button } from '@/components/ui/button';

const ProjectInputPage = () => {
  const methods = useForm({
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
    <FormProvider {...methods}>
    <div className="container mx-auto p-6">
      <Card className="p-6">
        <h1 className="text-2xl font-bold mb-4">案件入力</h1>
        <form onSubmit={methods.handleSubmit(onSubmit)}>
          <FormField 
            name="companyName"
            control={methods.control}
            render={({ field }) => (
              <FormItem>
                <FormLabel>案件元会社名</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
              </FormItem>
            )}
          />
          <FormField 
            name="projectName"
            control={methods.control}
            render={({ field }) => (
              <FormItem>
                <FormLabel>案件名</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
              </FormItem>
            )}
          />
          <FormField 
            name="projectDetail"
            control={methods.control}
            render={({ field }) => (
              <FormItem>
                <FormLabel>案件詳細</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
              </FormItem>
            )}
          />
          <FormField 
            name="members"
            control={methods.control}
            render={({ field }) => (
              <FormItem>
                <FormLabel>メンバー (カンマ区切り)</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
              </FormItem>
            )}
          />
          <FormField 
            name="technologies"
            control={methods.control}
            render={({ field }) => (
              <FormItem>
                <FormLabel>使用技術 (カンマ区切り)</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
              </FormItem>
            )}
          />
          <Button type="submit">送信</Button>
        </form>
      </Card>
    </div>
    </FormProvider>
  );
};

export default ProjectInputPage;