from rest_framework import serializers
from .models import Order, OrderItem
from menu.models import MenuItem


class OrderItemSerializer(serializers.ModelSerializer):
    item_id = serializers.IntegerField(source='item.id', read_only=True)
    item_name = serializers.CharField(source='item.name', read_only=True)

    class Meta:
        model = OrderItem
        fields = ['item_id', 'item_name', 'quantity']


class OrderSerializer(serializers.ModelSerializer):
    order_items = OrderItemSerializer(many=True, read_only=True)
    items = serializers.ListField(
        child=serializers.DictField(), write_only=True)
    # items 输入形如 [{"id": 1, "quantity": 2}, {"id": 3, "quantity": 1}]

    class Meta:
        model = Order
        fields = ['id', 'user', 'created_at', 'status', 'order_items', 'items']
        read_only_fields = ['id', 'user',
                            'created_at', 'status', 'order_items']

    def create(self, validated_data):
        items_data = validated_data.pop('items', [])
        # 当前登录用户来自 context 里的 request
        user = self.context['request'].user
        order = Order.objects.create(user=user)  # 默认状态 ORDERED
        for item in items_data:
            mi = MenuItem.objects.get(id=item['id'])
            qty = int(item.get('quantity', 1))
            OrderItem.objects.create(
                order=order, item=mi, quantity=max(qty, 1))
        return order
