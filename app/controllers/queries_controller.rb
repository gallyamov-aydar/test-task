class QueriesController < ApplicationController
	def index
		@query = Query.new

		@queries = Query.all
	end

	def create
		@query = Query.new(form_params)

		if @query.save
			@queries = Query.all
			
			# Возврат данных
			callback = {:text => @query.text, :timestamp => @query.created_at, :numOfQueries => @queries.length}
			render :json => callback
		end

	end

	private def form_params
		params.require(:query).permit(:text)
	end
end
