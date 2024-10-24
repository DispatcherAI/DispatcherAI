# main.py

import asyncio
import logging
from prisma import Prisma
from prisma.models import Call, Message
from prisma.errors import PrismaError
import datetime

# Configure logging to display informational and error message
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

# Initialize the Prisma Client
db = Prisma()

async def connect_db():
    """
    Establishes a connection to the PostgreSQL database using Prisma Client.
    """
    try:
        await db.connect()
        logger.info("Successfully connected to the database.")
    except PrismaError as e:
        logger.error(f"Prisma error during connection: {e}")
        raise
    except Exception as e:
        logger.error(f"Unexpected error during database connection: {e}")
        raise

async def disconnect_db():
    """
    Closes the connection to the PostgreSQL database.
    """
    try:
        await db.disconnect()
        logger.info("Successfully disconnected from the database.")
    except PrismaError as e:
        logger.error(f"Prisma error during disconnection: {e}")
        raise
    except Exception as e:
        logger.error(f"Unexpected error during database disconnection: {e}")
        raise

async def create_call(
    user_id: str
) -> Call:
    """
    Creates a new call in the database.

    Args:
        user_id (str, optional): ID of the user associated with the call.

    Returns:
        Call: The created Call object.

    Raises:
        PrismaError: If there's an error with Prisma during call creation.
        Exception: For any unexpected errors.
    """
    try:
        call = await db.call.create(
            data={
                'userId': user_id,  # Can be None if not associated with a user
                'status': 'Active'
            }
        )
        logger.info(f"Call created with ID: {call.id}")
        return call
    except PrismaError as e:
        logger.error(f"Prisma error creating call: {e}")
        raise
    except Exception as e:
        logger.error(f"Unexpected error creating call: {e}")
        raise

async def add_message(
    call_id: str,
    speaker: str,
    content: str
) -> Message:
    """
    Adds a message to an existing call.

    Args:
        call_id (str): ID of the call to which the message is associated.
        speaker (str): Speaker role ('caller' or 'AI').
        content (str): Content of the message.

    Returns:
        Message: The created Message object.

    Raises:
        PrismaError: If there's an error with Prisma during message creation.
        Exception: For any unexpected errors.
    """
    try:
        message = await db.message.create(
            data={
                'callId': call_id,
                'speaker': speaker,
                'content': content
            }
        )
        logger.info(f"Message added by {speaker}: {content}")
        return message
    except PrismaError as e:
        logger.error(f"Prisma error adding message: {e}")
        raise
    except Exception as e:
        logger.error(f"Unexpected error adding message: {e}")
        raise

async def simulate_conversation(call_id: str):
    """
    Simulates a conversation by adding message with alternating roles.

    Args:
        call_id (str): ID of the call to which message will be added.
    """
    # Define the sequence of message
    conversation = [
        {'speaker': 'caller', 'content': 'Hello, I need help with a fire in my building.'},
        {'speaker': 'AI', 'content': 'I understand. Can you please provide the address?'},
        {'speaker': 'caller', 'content': '123 Main Street, Springfield.'},
        {'speaker': 'AI', 'content': 'Thank you. Help is on the way. Please evacuate the premises immediately.'},
        {'speaker': 'caller', 'content': 'Understood. Thank you for your assistance.'},
        {'speaker': 'AI', 'content': 'You\'re welcome. Stay safe!'}
    ]

    # Iterate through the conversation and add each message
    for msg in conversation:
        await add_message(
            call_id=call_id,
            speaker=msg['speaker'],
            content=msg['content']
        )
        await asyncio.sleep(1)  # Simulate delay between message

async def main():
    """
    The main function orchestrates the creation of a call and simulates a conversation.
    """
    # Connect to the database
    await connect_db()

    try:
        # Create an initial call
        logger.info("Creating an initial call...")
        initial_call = await create_call(
            user_id="cm2mid3h60000pg506ris8x9w",
        )
        logger.info(f"Initial Call: ID={initial_call.id}, Status={initial_call.status}")

        # Simulate adding message to the call
        logger.info("Simulating conversation...")
        await simulate_conversation(call_id=initial_call.id)
        logger.info("Conversation simulation completed.")

        # Optionally, update call status to 'Resolved' after conversation
        logger.info("Updating call status to 'Resolved'...")
        updated_call = await db.call.update(
            where={'id': initial_call.id},
            data={'status': 'Resolved', 'endedAt': datetime.datetime.now(datetime.timezone.utc)}
        )
        logger.info(f"Call updated: ID={updated_call.id}, Status={updated_call.status}, EndedAt={updated_call.endedAt}")

    except Exception as e:
        logger.error(f"An error occurred during the simulation: {e}")

    finally:
        # Disconnect from the database
        await disconnect_db()

if __name__ == "__main__":
    # Execute the main function using asyncio
    asyncio.run(main())
