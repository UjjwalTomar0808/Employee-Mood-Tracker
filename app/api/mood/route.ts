import { NextRequest, NextResponse } from 'next/server';
import { getAllMoods, addMood, getMoodStats } from '@/utils/moods';

export async function GET() {
  try {
    const moods = getAllMoods();
    const stats = getMoodStats();
    
    return NextResponse.json({
      success: true,
      moods,
      stats
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: 'Failed to fetch moods' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { mood, comment, employeeName } = body;
    
    if (!mood || !['happy', 'neutral', 'sad'].includes(mood)) {
      return NextResponse.json(
        { success: false, error: 'Invalid mood value' },
        { status: 400 }
      );
    }
    
    const newMood = addMood({
      mood,
      comment: comment || undefined,
      employeeName: employeeName || 'Anonymous'
    });
    
    return NextResponse.json({
      success: true,
      mood: newMood
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: 'Failed to save mood' },
      { status: 500 }
    );
  }
}