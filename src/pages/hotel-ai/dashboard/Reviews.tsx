import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Star, ThumbsUp, ThumbsDown, Sparkles } from "lucide-react";

export default function Reviews() {
  const [selectedReview, setSelectedReview] = useState<any>(null);

  const reviews = [
    {
      id: 1,
      reviewer: "John Smith",
      rating: 5,
      date: "2 days ago",
      text: "Absolutely wonderful stay! The staff was incredibly friendly and the rooms were spotless. Would definitely recommend to anyone visiting the area.",
      sentiment: "positive",
      aiReply: "Thank you so much for your wonderful review, John! We're thrilled to hear that you enjoyed your stay with us and that our team made your visit memorable. We look forward to welcoming you back soon!",
      replied: false,
    },
    {
      id: 2,
      reviewer: "Sarah Johnson",
      rating: 4,
      date: "1 week ago",
      text: "Great hotel overall. The location is perfect and breakfast was excellent. Only minor issue was some noise from the hallway at night.",
      sentiment: "positive",
      aiReply: "Thank you for your feedback, Sarah! We're glad you enjoyed our location and breakfast service. We apologize for the noise disturbance and have addressed this with our team to ensure all guests enjoy a peaceful stay. We hope to serve you again soon!",
      replied: true,
    },
    {
      id: 3,
      reviewer: "Mike Davis",
      rating: 3,
      date: "2 weeks ago",
      text: "Decent hotel but room was smaller than expected. Check-in took longer than anticipated. Good value for the price though.",
      sentiment: "neutral",
      aiReply: "Thank you for taking the time to share your experience, Mike. We appreciate your feedback about the room size and check-in process. We're continuously working to improve our services and will use your comments to make necessary enhancements. We hope to have the opportunity to provide you with a better experience in the future.",
      replied: true,
    },
    {
      id: 4,
      reviewer: "Emily Chen",
      rating: 5,
      date: "3 weeks ago",
      text: "Outstanding service from start to finish! The concierge went above and beyond to help us plan our activities. Room was luxurious and comfortable.",
      sentiment: "positive",
      aiReply: null,
      replied: false,
    },
  ];

  const avgRating = reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length;
  const totalReviews = reviews.length;
  const positiveCount = reviews.filter((r) => r.sentiment === "positive").length;
  const pendingReplies = reviews.filter((r) => !r.replied).length;

  const getSentimentColor = (sentiment: string) => {
    switch (sentiment) {
      case "positive":
        return "bg-green-500/10 text-green-500 border-green-500/20";
      case "neutral":
        return "bg-yellow-500/10 text-yellow-500 border-yellow-500/20";
      case "negative":
        return "bg-red-500/10 text-red-500 border-red-500/20";
      default:
        return "";
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Google Reviews</h1>
        <p className="text-muted-foreground">AI-powered review management and response</p>
      </div>

      {/* Summary Cards */}
      <div className="grid gap-6 md:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Average Rating</CardTitle>
            <Star className="h-4 w-4 text-yellow-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{avgRating.toFixed(1)}</div>
            <div className="flex items-center mt-1">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star
                  key={i}
                  className={`h-4 w-4 ${
                    i < Math.floor(avgRating)
                      ? "fill-yellow-500 text-yellow-500"
                      : "text-gray-300"
                  }`}
                />
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Reviews</CardTitle>
            <ThumbsUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalReviews}</div>
            <p className="text-xs text-muted-foreground">Last 30 days</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Positive</CardTitle>
            <ThumbsUp className="h-4 w-4 text-green-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{positiveCount}</div>
            <p className="text-xs text-muted-foreground">
              {((positiveCount / totalReviews) * 100).toFixed(0)}% of reviews
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pending Replies</CardTitle>
            <Sparkles className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{pendingReplies}</div>
            <p className="text-xs text-muted-foreground">AI suggestions ready</p>
          </CardContent>
        </Card>
      </div>

      {/* Reviews List */}
      <div className="grid gap-6 lg:grid-cols-2">
        <div className="space-y-4">
          <h3 className="text-lg font-semibold">Recent Reviews</h3>
          {reviews.map((review) => (
            <Card
              key={review.id}
              className={`cursor-pointer transition-all hover:shadow-md ${
                selectedReview?.id === review.id ? "ring-2 ring-primary" : ""
              }`}
              onClick={() => setSelectedReview(review)}
            >
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div>
                    <CardTitle className="text-base">{review.reviewer}</CardTitle>
                    <div className="flex items-center gap-2 mt-1">
                      <div className="flex">
                        {Array.from({ length: 5 }).map((_, i) => (
                          <Star
                            key={i}
                            className={`h-3 w-3 ${
                              i < review.rating
                                ? "fill-yellow-500 text-yellow-500"
                                : "text-gray-300"
                            }`}
                          />
                        ))}
                      </div>
                      <span className="text-xs text-muted-foreground">{review.date}</span>
                    </div>
                  </div>
                  <Badge
                    variant="outline"
                    className={getSentimentColor(review.sentiment)}
                  >
                    {review.sentiment}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">{review.text}</p>
                {review.replied && (
                  <Badge variant="secondary" className="mt-2">
                    Replied
                  </Badge>
                )}
              </CardContent>
            </Card>
          ))}
        </div>

        {/* AI Reply Panel */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold">AI Reply Assistant</h3>
          {selectedReview ? (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Sparkles className="h-5 w-5 text-primary" />
                  AI-Generated Response
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <p className="text-sm font-medium mb-2">Review:</p>
                  <p className="text-sm text-muted-foreground bg-muted/50 p-3 rounded-lg">
                    {selectedReview.text}
                  </p>
                </div>

                {selectedReview.aiReply ? (
                  <>
                    <div>
                      <p className="text-sm font-medium mb-2">Suggested Reply:</p>
                      <Textarea
                        value={selectedReview.aiReply}
                        rows={6}
                        className="resize-none"
                      />
                    </div>

                    <div className="flex gap-2">
                      <Button className="flex-1">
                        <Sparkles className="mr-2 h-4 w-4" />
                        Post Reply
                      </Button>
                      <Button variant="outline">
                        Regenerate
                      </Button>
                    </div>
                  </>
                ) : (
                  <Button className="w-full">
                    <Sparkles className="mr-2 h-4 w-4" />
                    Generate AI Reply
                  </Button>
                )}

                {selectedReview.replied && (
                  <div className="bg-green-500/10 text-green-500 p-3 rounded-lg text-sm">
                    ✓ Reply has been posted
                  </div>
                )}
              </CardContent>
            </Card>
          ) : (
            <Card>
              <CardContent className="py-12 text-center text-muted-foreground">
                Select a review to see AI-generated response suggestions
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}
