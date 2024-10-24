# main.py

import asyncio
from prisma import Prisma
from prisma.models import User
from prisma.errors import PrismaError
import logging

# Configure logging to display information and error messages
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

async def create_user(clerk_user_id: str = None, phone_number: str = None) -> User:
    """
    Creates a new user in the database.

    Args:
        clerk_user_id (str, optional): The unique clerk user ID.
        phone_number (str, optional): The user's phone number.

    Returns:
        User: The created User object.

    Raises:
        PrismaError: If there's an error with Prisma during user creation.
        Exception: For any unexpected errors.
    """
    try:
        user = await db.user.create(
            data={
                'clerkUserId': clerk_user_id,
                'phoneNumber': phone_number
            }
        )
        logger.info(f"User created with ID: {user.id}")
        return user
    except PrismaError as e:
        logger.error(f"Prisma error creating user: {e}")
        raise
    except Exception as e:
        logger.error(f"Unexpected error creating user: {e}")
        raise

async def update_user(user_id: str, update_data: dict) -> User:
    """
    Updates an existing user's fields based on the provided dictionary.

    Args:
        user_id (str): The unique ID of the user to update.
        update_data (dict): A dictionary containing the fields to update.

    Returns:
        User: The updated User object.

    Raises:
        ValueError: If no valid fields are provided for update.
        PrismaError: If there's an error with Prisma during user update.
        Exception: For any unexpected errors.
    """
    # Define allowed fields that can be updated
    allowed_fields = {'clerkUserId', 'phoneNumber'}

    # Filter the update_data to include only allowed fields
    filtered_data = {k: v for k, v in update_data.items() if k in allowed_fields}

    if not filtered_data:
        logger.error("No valid fields provided for update.")
        raise ValueError("No valid fields provided for update.")

    try:
        user = await db.user.update(
            where={'id': user_id},
            data=filtered_data
        )
        logger.info(f"User with ID: {user.id} has been updated.")
        return user
    except PrismaError as e:
        logger.error(f"Prisma error updating user: {e}")
        raise
    except Exception as e:
        logger.error(f"Unexpected error updating user: {e}")
        raise

async def main():
    """
    The main function orchestrates the creation and updating of a user.
    """
    # Connect to the database
    await connect_db()

    try:
        # Create a new user
        logger.info("Creating a new user...")
        new_user = await create_user(clerk_user_id="clerk_12345", phone_number="555-1234")
        logger.info(f"User created: ID={new_user.id}, ClerkUserId={new_user.clerkUserId}, PhoneNumber={new_user.phoneNumber}")

        # Update the user's phone number and clerkUserId
        logger.info("Updating the user's phone number and ClerkUserId...")
        update_data = {
            'phoneNumber': '555-5678',
            'clerkUserId': 'clerk_67890'  # You can update multiple fields
        }
        updated_user = await update_user(user_id=new_user.id, update_data=update_data)
        logger.info(f"User updated: ID={updated_user.id}, ClerkUserId={updated_user.clerkUserId}, PhoneNumber={updated_user.phoneNumber}")

    except Exception as e:
        logger.error(f"An error occurred: {e}")

    finally:
        # Disconnect from the database
        await disconnect_db()

if __name__ == "__main__":
    # Run the main function using asyncio
    asyncio.run(main())
