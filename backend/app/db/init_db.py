from sqlalchemy.ext.asyncio import AsyncSession


async def init_db(session: AsyncSession) -> None:
    """
    Initialize default database data.

    Add default roles, permissions,
    admin account, plans, settings
    or any startup data here.
    """

    pass
