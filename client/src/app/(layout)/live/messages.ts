import { DispatchCall } from "@/app/(layout)/live/page";

export const MESSAGES: Record<string, DispatchCall> = {
    CA22ccebaacd73dcefa23f9b41a9bce0b3: {
        id: "CA22ccebaacd73dcefa23f9b41a9bce0b3",
        createdAt: new Date("2024-06-23T22:46:37.335108"),
        endedAt: new Date("2024-06-23T22:56:37.335108"),
        inProgress: false,
        status: "Resolved",
        userId: "000",
        transcript: {
            transcript: [
                {
                    role: "agent",
                    content:
                        "9-1-1, this is an AI assistant. A human dispatcher is on the line with us â€” tell me what's happening.",
                },
                {
                    role: "user",
                    content:
                        "There's an earthquake â€” it's still shaking. Please, send help.",
                },
                {
                    role: "agent",
                    content:
                        "I hear you. You're doing the right thing by calling. Where are you right now?",
                },
                {
                    role: "user",
                    content:
                        "I'm on the Golden Gate Bridge. The pedestrian walkway, north side. There are a lot of people down.",
                },
                {
                    role: "agent",
                    content:
                        "Got it â€” Golden Gate Bridge, north pedestrian walkway. I'm dispatching SFFD and CHP now. Roughly how many people are injured?",
                },
                {
                    role: "user",
                    content:
                        "Maybe ten, fifteen. Some of them aren't moving. I don't know what to do.",
                },
                {
                    role: "agent",
                    content:
                        "Stay where you are if the structure feels stable. Do not try to move anyone who can't move on their own â€” you could make their injuries worse. Are you hurt?",
                },
                {
                    role: "user",
                    content:
                        "I'm okay. I cut my hand on something but I'm okay. Just please tell them to hurry.",
                },
                {
                    role: "agent",
                    content:
                        "Units are en route. ETA four minutes. I'm staying on the line. If anyone near you is conscious and bleeding, apply firm pressure with whatever clean cloth you have. Can you do that?",
                },
                {
                    role: "user",
                    content: "Yeah. Yeah, I can do that.",
                },
                {
                    role: "agent",
                    content:
                        "Good. Keep talking to me. Tell me if anything around you changes â€” the bridge, the people, anything.",
                },
            ],
        },
        callAnalytics: {
            id: "CA22ccebaacd73dcefa23f9b41a9bce0b3",
            callId: "CA22ccebaacd73dcefa23f9b41a9bce0b3",
            createdAt: new Date("2024-06-23T22:46:37.335108"),
            updatedAt: new Date("2024-06-23T22:46:37.335108"),
            type: "Police",
            severity: "Medium",
            summary:
                "Caller reports current earthquakes and requests immediate assistance. Location: Golden Gate Bridge with many people injured.",
            sentiment: [
                {
                    emotion: "Fear",
                    intensity: 0.3548029899331076,
                },
                {
                    emotion: "Confusion",
                    intensity: 0.2665824613400868,
                },
                {
                    emotion: "Anxiety",
                    intensity: 0.21041041083766945,
                },
            ],
            topics: [],
            location: "Golden Gate Bridge, San Francisco, CA",
            latitude: 37.8199109,
            longitude: -122.4785598,
            title: "Earthquake Emergency at Golden Gate Bridge",
            name: "",
            address: "",
            recommendation: "",
            streetView: "/street-view/golden-gate.jpg",
        },
    },
};
