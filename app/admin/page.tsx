'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft, Users, TrendingUp, RefreshCw } from 'lucide-react';
import { format } from 'date-fns';
import { ThemeToggle } from '@/components/theme-toggle';

interface MoodEntry {
  id: string;
  mood: 'happy' | 'neutral' | 'sad';
  comment?: string;
  timestamp: Date;
  employeeName?: string;
}

interface MoodStats {
  total: number;
  happy: number;
  neutral: number;
  sad: number;
}

const moodConfig = {
  happy: { emoji: '😄', label: 'Happy', color: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200' },
  neutral: { emoji: '😐', label: 'Neutral', color: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200' },
  sad: { emoji: '😞', label: 'Sad', color: 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200' }
};

export default function AdminDashboard() {
  const [moods, setMoods] = useState<MoodEntry[]>([]);
  const [stats, setStats] = useState<MoodStats>({ total: 0, happy: 0, neutral: 0, sad: 0 });
  const [isLoading, setIsLoading] = useState(true);
  const [isRefreshing, setIsRefreshing] = useState(false);

  const fetchMoods = async (showRefreshAnimation = false) => {
    if (showRefreshAnimation) setIsRefreshing(true);
    
    try {
      const response = await fetch('/api/mood');
      const data = await response.json();
      
      if (data.success) {
        // Convert timestamp strings back to Date objects
        const moodsWithDates = data.moods.map((mood: any) => ({
          ...mood,
          timestamp: new Date(mood.timestamp)
        }));
        setMoods(moodsWithDates);
        setStats(data.stats);
      }
    } catch (error) {
      console.error('Failed to fetch moods:', error);
    } finally {
      setIsLoading(false);
      if (showRefreshAnimation) setIsRefreshing(false);
    }
  };

  useEffect(() => {
    fetchMoods();
  }, []);

  const handleRefresh = () => {
    fetchMoods(true);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50 dark:from-gray-900 dark:via-gray-800 dark:to-blue-900 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600 dark:text-gray-300">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50 dark:from-gray-900 dark:via-gray-800 dark:to-blue-900">
      <div className="container mx-auto px-4 py-8">
        {/* Theme Toggle */}
        <div className="absolute top-4 right-4">
          <ThemeToggle />
        </div>

        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
          <div>
            <Link href="/">
              <Button variant="ghost" className="text-gray-600 dark:text-gray-300 hover:text-gray-800 dark:hover:text-gray-100 mb-4">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Home
              </Button>
            </Link>
            <h1 className="text-4xl font-bold text-gray-900 dark:text-white">Admin Dashboard</h1>
            <p className="text-gray-600 dark:text-gray-300 mt-2">Monitor employee mood trends and wellbeing</p>
          </div>
          <Button 
            onClick={handleRefresh}
            variant="outline"
            disabled={isRefreshing}
            className="border-gray-300 dark:border-gray-600 text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800"
          >
            <RefreshCw className={`h-4 w-4 mr-2 ${isRefreshing ? 'animate-spin' : ''}`} />
            Refresh Data
          </Button>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card className="border-0 shadow-lg bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-600 dark:text-gray-300">Total Entries</CardTitle>
              <Users className="h-4 w-4 text-gray-600 dark:text-gray-300" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-gray-900 dark:text-white">{stats.total}</div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-lg bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-600 dark:text-gray-300">Happy</CardTitle>
              <span className="text-2xl">😄</span>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-green-600 dark:text-green-400">{stats.happy}%</div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-lg bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-600 dark:text-gray-300">Neutral</CardTitle>
              <span className="text-2xl">😐</span>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-yellow-600 dark:text-yellow-400">{stats.neutral}%</div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-lg bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-600 dark:text-gray-300">Sad</CardTitle>
              <span className="text-2xl">😞</span>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-red-600 dark:text-red-400">{stats.sad}%</div>
            </CardContent>
          </Card>
        </div>

        {/* Mood Entries Table */}
        <Card className="border-0 shadow-xl bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="text-2xl text-gray-800 dark:text-white">Recent Mood Entries</CardTitle>
            <CardDescription className="text-gray-600 dark:text-gray-300">
              Latest mood submissions from team members
            </CardDescription>
          </CardHeader>
          <CardContent>
            {moods.length === 0 ? (
              <div className="text-center py-12">
                <TrendingUp className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-500 dark:text-gray-400 text-lg">No mood entries yet</p>
                <p className="text-gray-400 dark:text-gray-500">Entries will appear here as team members submit their moods</p>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="font-semibold text-gray-700 dark:text-gray-300">Employee</TableHead>
                      <TableHead className="font-semibold text-gray-700 dark:text-gray-300">Mood</TableHead>
                      <TableHead className="font-semibold text-gray-700 dark:text-gray-300">Comment</TableHead>
                      <TableHead className="font-semibold text-gray-700 dark:text-gray-300">Date & Time</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {moods.map((mood) => (
                      <TableRow key={mood.id} className="hover:bg-gray-50/50 dark:hover:bg-gray-700/50">
                        <TableCell className="font-medium text-gray-900 dark:text-white">
                          {mood.employeeName || 'Anonymous'}
                        </TableCell>
                        <TableCell>
                          <Badge className={moodConfig[mood.mood].color}>
                            <span className="mr-2">{moodConfig[mood.mood].emoji}</span>
                            {moodConfig[mood.mood].label}
                          </Badge>
                        </TableCell>
                        <TableCell className="max-w-md">
                          {mood.comment ? (
                            <p className="text-gray-700 dark:text-gray-300 truncate" title={mood.comment}>
                              {mood.comment}
                            </p>
                          ) : (
                            <span className="text-gray-400 dark:text-gray-500 italic">No comment</span>
                          )}
                        </TableCell>
                        <TableCell className="text-gray-600 dark:text-gray-300">
                          <div className="space-y-1">
                            <div>{format(mood.timestamp, 'MMM dd, yyyy')}</div>
                            <div className="text-sm text-gray-400 dark:text-gray-500">
                              {format(mood.timestamp, 'h:mm a')}
                            </div>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}