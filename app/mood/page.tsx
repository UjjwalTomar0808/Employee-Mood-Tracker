'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { ArrowLeft, Send } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { ThemeToggle } from '@/components/theme-toggle';

type MoodOption = {
  value: 'happy' | 'neutral' | 'sad';
  emoji: string;
  label: string;
  color: string;
  darkColor: string;
};

const moodOptions: MoodOption[] = [
  { 
    value: 'happy', 
    emoji: '😄', 
    label: 'Happy', 
    color: 'border-green-500 bg-green-50',
    darkColor: 'dark:border-green-400 dark:bg-green-900/30'
  },
  { 
    value: 'neutral', 
    emoji: '😐', 
    label: 'Neutral', 
    color: 'border-yellow-500 bg-yellow-50',
    darkColor: 'dark:border-yellow-400 dark:bg-yellow-900/30'
  },
  { 
    value: 'sad', 
    emoji: '😞', 
    label: 'Sad', 
    color: 'border-red-500 bg-red-50',
    darkColor: 'dark:border-red-400 dark:bg-red-900/30'
  }
];

export default function MoodSubmission() {
  const [selectedMood, setSelectedMood] = useState<'happy' | 'neutral' | 'sad' | null>(null);
  const [comment, setComment] = useState('');
  const [employeeName, setEmployeeName] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!selectedMood) {
      toast({
        title: "Please select a mood",
        description: "Choose how you're feeling today before submitting.",
        variant: "destructive"
      });
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await fetch('/api/mood', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          mood: selectedMood,
          comment: comment.trim() || undefined,
          employeeName: employeeName.trim() || 'Anonymous'
        }),
      });

      const data = await response.json();

      if (data.success) {
        toast({
          title: "Mood submitted successfully!",
          description: "Thank you for sharing how you're feeling today.",
        });
        router.push('/');
      } else {
        throw new Error(data.error || 'Failed to submit mood');
      }
    } catch (error) {
      toast({
        title: "Submission failed",
        description: "Please try again in a moment.",
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-blue-900">
      <div className="container mx-auto px-4 py-8">
        {/* Theme Toggle */}
        <div className="absolute top-4 right-4">
          <ThemeToggle />
        </div>

        {/* Back Button */}
        <div className="mb-8">
          <Link href="/">
            <Button variant="ghost" className="text-gray-600 dark:text-gray-300 hover:text-gray-800 dark:hover:text-gray-100">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Home
            </Button>
          </Link>
        </div>

        {/* Main Form */}
        <div className="max-w-2xl mx-auto">
          <Card className="border-0 shadow-xl bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm">
            <CardHeader className="text-center pb-6">
              <CardTitle className="text-3xl text-gray-800 dark:text-white mb-2">How are you feeling today?</CardTitle>
              <CardDescription className="text-gray-600 dark:text-gray-300 text-lg">
                Select your current mood and optionally share more details
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-8">
                {/* Name Input */}
                <div className="space-y-2">
                  <Label htmlFor="employeeName" className="text-sm font-medium text-gray-700 dark:text-gray-300">
                    Your Name (Optional)
                  </Label>
                  <Input
                    id="employeeName"
                    value={employeeName}
                    onChange={(e) => setEmployeeName(e.target.value)}
                    placeholder="Enter your name or leave blank for anonymous"
                    className="border-gray-300 dark:border-gray-600 focus:border-blue-500 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                  />
                </div>

                {/* Mood Selection */}
                <div className="space-y-4">
                  <Label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                    Select your mood *
                  </Label>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    {moodOptions.map((mood) => (
                      <button
                        key={mood.value}
                        type="button"
                        onClick={() => setSelectedMood(mood.value)}
                        className={`p-6 rounded-xl border-2 transition-all duration-300 hover:scale-105 ${
                          selectedMood === mood.value
                            ? `${mood.color} ${mood.darkColor} border-current shadow-lg`
                            : 'border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-700 hover:border-gray-300 dark:hover:border-gray-500 hover:shadow-md'
                        }`}
                      >
                        <div className="text-center">
                          <div className="text-4xl mb-3">{mood.emoji}</div>
                          <div className="font-semibold text-gray-800 dark:text-white">{mood.label}</div>
                        </div>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Comment */}
                <div className="space-y-2">
                  <Label htmlFor="comment" className="text-sm font-medium text-gray-700 dark:text-gray-300">
                    Additional Comments (Optional)
                  </Label>
                  <Textarea
                    id="comment"
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                    placeholder="Share more about how you're feeling or what's affecting your mood..."
                    rows={4}
                    className="border-gray-300 dark:border-gray-600 focus:border-blue-500 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                  />
                </div>

                {/* Submit Button */}
                <Button
                  type="submit"
                  disabled={!selectedMood || isSubmitting}
                  className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold py-4 px-8 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? (
                    <div className="flex items-center justify-center">
                      <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                      Submitting...
                    </div>
                  ) : (
                    <div className="flex items-center justify-center">
                      <Send className="h-5 w-5 mr-2" />
                      Submit Mood
                    </div>
                  )}
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}