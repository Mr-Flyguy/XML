export function requests_form_html() {
    return `
        <form id="request-form" class="request-form-block">
            <div class="row g-3">
                <div class="col-md-6">
                    <label class="form-label">Название заявки</label>
                    <input type="text" class="form-control" id="request-title" required>
                </div>

                <div class="col-md-6">
                    <label class="form-label">Статус</label>
                    <select class="form-select" id="request-status">
                        <option>Новая</option>
                        <option>В обработке</option>
                        <option>Выполнено</option>
                    </select>
                </div>

                <div class="col-12">
                    <label class="form-label">Описание</label>
                    <input type="text" class="form-control" id="request-text" required>
                </div>

                <div class="col-md-6">
                    <label class="form-label">Тип вычисления</label>
                    <select class="form-select" id="request-type">
                        <option value="solve">solve</option>
                        <option value="sum_of_squares">sumOfSquares</option>
                    </select>
                </div>

                <div class="col-md-6">
                    <label class="form-label">Ссылка на картинку</label>
                    <input
                        type="text"
                        class="form-control"
                        id="request-image"
                        value="https://images.unsplash.com/photo-1509228627152-72ae9ae6848d?auto=format&fit=crop&w=1200&q=80"
                        required
                    >
                </div>

                <div id="solve-fields">
                    <div class="row g-3">
                        <div class="col-md-8">
                            <label class="form-label">Выражение</label>
                            <input type="text" class="form-control" id="request-expression" value="2*x+5">
                        </div>

                        <div class="col-md-4">
                            <label class="form-label">x</label>
                            <input type="number" class="form-control" id="request-x" value="3">
                        </div>
                    </div>
                </div>

                <div id="array-fields" class="d-none">
                    <div class="col-12">
                        <label class="form-label">Массив чисел через запятую</label>
                        <input type="text" class="form-control" id="request-numbers" value="1, 2, 3, 4">
                    </div>
                </div>

                <div class="col-12">
                    <button type="submit" class="btn btn-danger pm-btn">
                        Сохранить заявку
                    </button>
                </div>
            </div>
        </form>
    `;
}