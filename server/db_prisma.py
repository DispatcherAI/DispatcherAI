import uuid
from prisma import Prisma
import json

# ----- Call Accessors -----

async def get_all_calls(db: Prisma, user_id: str):
    """
    Fetch all calls for a specific user by user_id.
    """
    calls = await db.call.find_many(
        where={'userId': user_id},
        include={
            'callAnalytics': True,
            'user': True,
        }
    )
    return calls


async def get_call(db: Prisma, call_id: str):
    """
    Fetch a specific call by its ID.
    """
    call = await db.call.find_unique(
        where={'id': call_id},
        include={
            'callAnalytics': True,
            'user': True,
        }
    )


async def create_call(db: Prisma, call_id: str, userId: str):
    """
    Create a new call record.

    Args:
        db (Prisma): Prisma client
        call_id (str): Call ID
    """
    print("Creating call", call_id, userId)
    
    await db.call.create(
        data={
            "id": call_id,
            "inProgress": True,
            "userId": userId,
            "status": "Active",
            "transcript": json.dumps([]),
        }
    )
    
    print("Creating call analytics", call_id)
    
    await db.callanalytics.create(
        data={
            "callId": call_id,
        }
    )


async def update_call(db: Prisma, call_id: str, updated_data: dict):
    """
    Update a specific call's data. For example:
    {"status": "Resolved", "inProgress": False}
    """
    updated_call = await db.call.update(
        where={'id': call_id},
        data=updated_data,
        include={'callAnalytics': True, 'user': True}
    )
    return updated_call

async def update_call_transcript(db: Prisma, call_id: str, transcript: list):
    """
    Update the transcript for a specific call.
    """
    updated_call = await db.call.update(
        where={'id': call_id},
        data={'transcript': transcript}
    )
    return updated_call


async def delete_call(db: Prisma, call_id: str):
    """
    Delete a call by its ID.
    """
    # Delete related data first if cascade is not set
    await db.message.delete_many(where={'callId': call_id})
    await db.callanalytics.delete_many(where={'callId': call_id})
    deleted_call = await db.call.delete(where={'id': call_id})
    return deleted_call

# ----- CallAnalytics Accessors -----

async def get_call_analytics(db: Prisma, call_id: str):
    """
    Fetch a specific call analytics record by its ID.
    """
    analytics = await db.callanalytics.find_unique(
        where={'callId': call_id}
    )
    return analytics


async def get_call_analytics_for_call(db: Prisma, call_id: str):
    """
    Fetch all analytics records associated with a specific call.
    """
    analytics_list = await db.callanalytics.find_many(
        where={'callId': call_id}
    )
    return analytics_list




async def update_call_analytics(db: Prisma, call_analytics_id: str, updated_data: dict):
    """
    Update a specific call analytics record by its ID.
    updated_data could look like:
    {
      'severity': 'Critical',
      'summary': 'Updated summary'
    }
    """
    updated_analytics = await db.callanalytics.update(
        where={'id': call_analytics_id},
        data=updated_data
    )
    return updated_analytics


async def delete_call_analytics(db: Prisma, call_analytics_id: str):
    """
    Delete a specific call analytics record by its ID.
    """
    deleted_analytics = await db.callanalytics.delete(
        where={'id': call_analytics_id}
    )
    return deleted_analytics


async def upsert_call_analytics(db: Prisma, call_analytics_id: str, call_id: str, updated_data: dict):
    """
    Upsert a call analytics record.
    If a record with call_analytics_id exists, update it with updated_data.
    If it does not exist, create a new one with that id and updated_data.

    Example updated_data:
    {
      'type': 'Fire',
      'severity': 'Medium',
      'summary': 'Smoke detected in the building.',
      'topics': ['fire', 'smoke', 'evacuation'],
      'location': '123 Main St',
      'latitude': 37.7749,
      'longitude': -122.4194,
      'name': 'John Doe',
      'address': '123 Main St',
      'recommendation': 'Evacuate immediately!'
    }
    """
    # Create data must include all required fields, including 'id' and 'callId'.
    create_data = {
        'id': call_analytics_id,
        'callId': call_id,
        **updated_data
    }

    result = await db.callanalytics.upsert(
        where={'id': call_analytics_id},
        data={
            'create': create_data,
            'update': updated_data
        }
    )

    return result
