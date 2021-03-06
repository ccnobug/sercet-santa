"""Initial migration.

Revision ID: eea00c6fdf92
Revises: 
Create Date: 2022-02-14 22:56:52.993475

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = 'eea00c6fdf92'
down_revision = None
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_table('groups')
    op.drop_table('participants')
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_table('participants',
    sa.Column('group_id', sa.VARCHAR(), nullable=True),
    sa.Column('name', sa.VARCHAR(), nullable=True),
    sa.Column('email', sa.VARCHAR(), nullable=True),
    sa.Column('screte_santa', sa.VARCHAR(), nullable=True),
    sa.ForeignKeyConstraint(['group_id'], ['groups.id'], )
    )
    op.create_table('groups',
    sa.Column('id', sa.VARCHAR(), nullable=True),
    sa.Column('date', sa.VARCHAR(), nullable=True)
    )
    # ### end Alembic commands ###
