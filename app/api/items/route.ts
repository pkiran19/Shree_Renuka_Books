import { NextResponse } from 'next/server';
import { getStoredItems, addItem, deleteItem, updateItem } from '@/lib/store';

export async function GET() {
  const items = getStoredItems();
  return NextResponse.json({ success: true, count: items.length, items });
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    if (!body.title || !body.category || !body.price) {
      return NextResponse.json(
        { success: false, error: 'Title, category, and price are required.' },
        { status: 400 }
      );
    }

    const newItem = addItem(body);
    return NextResponse.json({ success: true, item: newItem }, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: 'Invalid JSON body or server error.' },
      { status: 500 }
    );
  }
}

export async function PUT(request: Request) {
  try {
    const body = await request.json();
    if (!body.id) {
      return NextResponse.json(
        { success: false, error: 'Item ID is required for update.' },
        { status: 400 }
      );
    }

    const updated = updateItem(body.id, body);
    if (!updated) {
      return NextResponse.json(
        { success: false, error: 'Item not found.' },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true, item: updated });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: 'Failed to update item.' },
      { status: 500 }
    );
  }
}

export async function DELETE(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');
    if (!id) {
      return NextResponse.json(
        { success: false, error: 'Item ID is required.' },
        { status: 400 }
      );
    }

    const deleted = deleteItem(id);
    return NextResponse.json({ success: deleted });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: 'Failed to delete item.' },
      { status: 500 }
    );
  }
}
